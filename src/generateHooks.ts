import lodash from 'lodash';
const { get, groupBy } = lodash;
import {
  ComponentsObject,
  OperationObject,
  ParameterObject,
  ReferenceObject,
  ResponseObject,
  SchemaObject,
} from 'openapi3-ts';
import { formatDescription, getResReqTypes, isReference, resolveValue } from './utils.js';
import pasCase from 'case';
import chalk from 'chalk';

const { pascal, camel } = pasCase;

const IdentifierRegexp = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;

/**
 * Return every params in a path
 */
const getParamsInPath = (path: string) => {
  let n;
  const output = [];
  const templatePathRegex = /\{(\w+)}/g;
  while ((n = templatePathRegex.exec(path)) !== null) {
    output.push(n[1]);
  }

  return output;
};

/**
 * Generate a react-query component from openapi operation specs
 */
export const createHook = ({
  operation,
  verb,
  route,
  operationIds,
  parameters,
  schemasComponents,
  headerFilters,
  overrides,
}: {
  operation: OperationObject;
  verb: string;
  route: string;
  operationIds: string[];
  parameters: (ReferenceObject | ParameterObject)[] | undefined;
  schemasComponents?: ComponentsObject;
  headerFilters?: string[];
  overrides?: Record<
    string,
    { type: 'query' } | { type: 'mutation' } | { type: 'infiniteQuery'; infiniteQueryParm: string }
  >;
}) => {
  const { operationId = route.replace('/', '') } = operation;
  if (operationId === '*') {
    throw new Error(`Invalid operationId/Route set for ${verb} ${route}`);
  }
  if (operationIds.includes(operationId)) {
    return { implementation: '', imports: [], queryImports: [] };
  }
  operationIds.push(operationId);

  route = route.replace(/\{/g, '${').replace('//', '/'); // `/pet/{id}` => `/pet/${id}`

  // Remove the last param of the route if we are in the DELETE case
  let lastParamInTheRoute: string | null = null;

  const componentName = pascal(operationId!);

  const isOk = ([statusCode]: [string, ResponseObject | ReferenceObject]) =>
    statusCode.toString().startsWith('2');

  const responseTypes = getResReqTypes(Object.entries(operation.responses).filter(isOk)) || 'void';
  const requestBodyTypes = getResReqTypes([['body', operation.requestBody!]]);

  let imports = [responseTypes];
  let queryImports = [] as Array<'mutation' | 'query' | 'infiniteQuery'>;

  const paramsInPath = getParamsInPath(route).filter(
    (param) => !(verb === 'delete' && param === lastParamInTheRoute)
  );

  const {
    query: queryParams = [],
    path: pathParams = [],
    header = [],
  } = groupBy(
    [...(parameters || []), ...(operation.parameters || [])].map<ParameterObject>((p) => {
      if (isReference(p)) {
        return get(schemasComponents, p.$ref.replace('#/components/', '').replace('/', '.'));
      } else {
        return p;
      }
    }),
    'in'
  );

  const headerParams = header.filter((p) => !headerFilters?.includes(p.name));

  let enabled = [] as any;

  // TODO: extract all requestBody or remove useQuery variants
  let enabledParam = '!!params';
  [...queryParams, ...pathParams, ...headerParams].forEach((item) => {
    if (item.required) {
      enabled.push(`["${item.name}"]`);
      if (enabledParam && enabledParam !== '!!params') {
        enabledParam += `&& params['${item.name}'] != null`;
      } else {
        enabledParam = `params['${item.name}'] != null`;
      }
    }
  });

  // `!props${enabled.join('== null && !props')}`;

  const paramsTypes = paramsInPath
    .map((p) => {
      try {
        const { name, required, schema } = pathParams.find((i) => i.name === p)!;
        return `${name}${required ? '' : '?'}: ${resolveValue(schema!)}`;
      } catch (err) {
        throw new Error(`The path params ${p} can't be found in parameters (${operationId})`);
      }
    })
    .join('; ');

  const queryParamsType = queryParams
    .map((p) => {
      const processedName = IdentifierRegexp.test(p.name) ? p.name : `"${p.name}"`;
      return `${formatDescription(p.description)}
      ${processedName}${p.required ? '' : '?'}: ${resolveValue(p.schema!)}`;
    })
    .join(';\n  ');

  const headerType = headerParams
    .map((p) => {
      try {
        const { name, required, schema } = headerParams.find((i) => i.name === p.name)!;
        return `"${name}"${required ? '' : '?'}: ${resolveValue(schema!)}`;
      } catch (err) {
        throw new Error(`The path params ${p} can't be found in parameters (${operationId})`);
      }
    })
    .join('; ');

  // Retrieve the type of the param for delete verb
  const lastParamInTheRouteDefinition =
    operation.parameters && lastParamInTheRoute
      ? (operation.parameters.find((p) => {
          if (isReference(p)) {
            return false;
          }
          return p.name === lastParamInTheRoute;
        }) as ParameterObject | undefined) // Reference is not possible
      : { schema: { type: 'string' } };

  if (!lastParamInTheRouteDefinition) {
    throw new Error(`The path params ${lastParamInTheRoute} can't be found in parameters (${operationId})`);
  }

  const defaultDescription = `type: ${verb}\noperationId: ${operationId}\nurl: ${route}`;

  const description = formatDescription(
    operation.summary && operation.description
      ? `${defaultDescription}\n\n${operation.summary}\n\n${operation.description}`
      : `${defaultDescription}`
  );

  let output = `\n\n${description}`;

  const headerParam = headerType && headerType !== 'void' ? `${headerType};` : '';
  const queryParam = queryParamsType && queryParamsType !== 'void' ? `${queryParamsType}` : '';
  const requestBodyComponent = requestBodyTypes && requestBodyTypes !== 'void' ? `${requestBodyTypes}` : '';

  if (requestBodyComponent) {
    imports.push(requestBodyComponent);
  }

  const isUpdateRequest = ['post', 'patch', 'put'].includes(verb);

  const generateProps = (props: ParameterObject[]) => {
    return props.map((item) => `["${item.name}"]: props["${item.name}"]`).join(',');
  };

  const generateBodyProps = () => {
    const definitionKey = Object.keys(schemasComponents?.schemas || {}).find(
      (key) => pascal(key) === requestBodyComponent
    );
    if (definitionKey) {
      const scheme = schemasComponents?.schemas?.[definitionKey] as SchemaObject;
      return Object.keys(scheme.properties as SchemaObject)
        .map((item: string) => `["${item}"]: props["${item}"]`)
        .join(',');
    }
  };

  const fetchName = camel(componentName);

  const createQueryHooks = (emptyParams?: boolean) => {
    const params = emptyParams ? '' : `params: ${componentName}Params,`;
    const key = emptyParams ? '' : `params`;
    const mutationParams = emptyParams ? 'void' : `${componentName}Params`;
    const queryParamType = emptyParams ? '' : `${componentName}Params &`;
    const filterParams = emptyParams
      ? '{ filters }: { filters?: QueryFilters }'
      : `{ params, filters }: { params: ${componentName}Params, filters?: QueryFilters }`;
    const cacheParams = emptyParams
      ? `{updater, options}: {updater: Updater<${responseTypes} | undefined, ${responseTypes} | undefined>, options?: SetDataOptions | undefined}`
      : `{params, updater, options}: {params: ${componentName}Params, updater: Updater<${responseTypes} | undefined, ${responseTypes} | undefined>, options?: SetDataOptions | undefined}`;
    const queryKey = emptyParams
      ? `use${componentName}Query.baseKey()`
      : `[...use${componentName}Query.baseKey(), params]`;

    const createQuery = () => `
    type ${componentName}QueryProps<T = ${responseTypes}> = ${queryParamType} {
      options?: UseQueryOptions<${responseTypes}, AxiosError, T, any> 
    }
    export function use${componentName}Query<T = ${responseTypes}>({ options = {}, ...params }: ${componentName}QueryProps<T>) { 
      return useQuery(use${componentName}Query.queryKey(${key}), async () => ${fetchName}(${key}), { enabled: ${enabledParam}, ...options });
    }

    use${componentName}Query.baseKey = (): QueryKey => ["${componentName.toLowerCase()}"];
  
    use${componentName}Query.queryKey = (${params}): QueryKey => ${queryKey};
  
    use${componentName}Query.updateCache = (${cacheParams}) => queryClient.setQueryData<${responseTypes}>(use${componentName}Query.queryKey(${key}), updater, options);
    
    use${componentName}Query.getQueryState = (${filterParams})=> queryClient.getQueryState<${responseTypes}>(use${componentName}Query.queryKey(${key}), filters);
    
    use${componentName}Query.getQueryData = (${filterParams})=> queryClient.getQueryData<${responseTypes}>(use${componentName}Query.queryKey(${key}), filters);
    
    use${componentName}Query.prefetch = (${params}) => queryClient.prefetchQuery<${responseTypes}>(use${componentName}Query.queryKey(${key}), ()=> ${fetchName}(${key}));
  
    use${componentName}Query.cancelQueries = (${params}) => queryClient.cancelQueries(use${componentName}Query.queryKey(${key}))
  
    use${componentName}Query.invalidate = (${params}) => queryClient.invalidateQueries<${responseTypes}>(use${componentName}Query.queryKey(${key}));
  
    use${componentName}Query.refetchStale = (${params}) => queryClient.refetchQueries<${responseTypes}>(use${componentName}Query.queryKey(${key}), { stale: true });
  `;

    const getInfiniteQuery = ({ pageParam }: { pageParam: string }) => `
    type ${componentName}QueryProps<T = ${responseTypes}> = ${queryParamType} {
      options: UseInfiniteQueryOptions<${responseTypes}, AxiosError, T, any> 
    }
    export function use${componentName}Query<T = ${responseTypes}>({ options = {}, ...params }: ${componentName}QueryProps<T>) { 
      return useInfiniteQuery(use${componentName}Query.queryKey(${key}), async ({ pageParam = 0 }) => ${fetchName}({${pageParam}: pageParam, ...params}), { enabled: ${enabledParam}, ...options });
    }

    use${componentName}Query.baseKey = (): QueryKey => ["${componentName.toLowerCase()}"];
  
    use${componentName}Query.queryKey = (${params}): QueryKey => ${queryKey};
  
  `;

    const createMutation = () => `
    type ${componentName}MutationProps<T> = {
      options?: UseMutationOptions<${responseTypes}, AxiosError, ${mutationParams}, T> 
    }
    export function use${componentName}Mutation<T = ${responseTypes}>(props?: ${componentName}MutationProps<T>) { 
      return useMutation(async (${key}) => ${fetchName}(${key}), props?.options)
    };
    `;

    const override = overrides?.[operationId];
    if (override?.type === 'query') {
      console.log(chalk.blue(`⚙️  [${operationId}] has been changed to a useQuery hook`));
      queryImports.push('query');
      return createQuery();
    }

    if (override?.type === 'mutation') {
      queryImports.push('mutation');
      console.log(chalk.blue(`⚙️  [${operationId}] has been changed to a useMutation hook`));
      return createMutation();
    }

    if (override?.type === 'infiniteQuery') {
      console.log(chalk.blue(`⚙️  [${operationId}] has been changed to a useInfiniteQuery hook`));
      queryImports.push('infiniteQuery');
      return getInfiniteQuery({ pageParam: override.infiniteQueryParm });
    }

    if (verb === 'get') {
      queryImports.push('query');
      return createQuery();
    }

    queryImports.push('mutation');
    return createMutation();
  };

  output += createQueryHooks(!requestBodyComponent && !paramsInPath.length && !queryParam && !headerParam);

  if (!requestBodyComponent && !paramsInPath.length && !queryParam && !headerParam) {
    output += `
    const ${fetchName} = async () => {
      const result = await api.${verb}<${responseTypes}>(\`${route}\`);
      return result.data;
    }
    `;
  }

  if (!requestBodyComponent && paramsInPath.length && queryParam && !headerParam) {
    const config = isUpdateRequest ? 'body,{params}' : '{params}';
    output += `
    type ${componentName}Params = {
      ${paramsTypes}
      ${queryParamsType}; 
    }

     const ${fetchName} = async (props:${componentName}Params) => {
      const {${paramsInPath.join(', ')}, ...params} = props
      const result = await api.${verb}<${responseTypes}>(\`${route}\`, ${config})
      return result.data;
    }`;
  }

  if (!requestBodyComponent && paramsInPath.length && !queryParam && !headerParam) {
    output += `
    type ${componentName}Params = {
      ${paramsTypes}
    }

    const ${fetchName} = async (props: ${componentName}Params ) => {
      const result = await api.${verb}<${responseTypes}>(\`${route.replace(/\{/g, '{props.')}\`);
      return result.data;
    }
    `;
  }

  if (!requestBodyComponent && !paramsInPath.length && queryParam && !headerParam) {
    const config = isUpdateRequest ? 'null,{params}' : '{params}';
    output += `
    type ${componentName}Params = { 
      ${queryParamsType} 
    }

    const ${fetchName} = async (params: ${componentName}Params) => {
      const result = await api.${verb}<${responseTypes}>(\`${route}\`, ${config})
      return result.data;
    }
    `;
  }
  if (!requestBodyComponent && !paramsInPath.length && queryParam && headerParam) {
    const config = isUpdateRequest ? 'null,{headers, params: queryParams}' : '{headers, params: queryParams}';
    output += `
      type ${componentName}Params = {
        ${headerParam}
        ${queryParamsType}
      }
      const ${fetchName} = async (props: ${componentName}Params) => {
        const headers = {${generateProps(header)}}
        const queryParams = {${generateProps(queryParams)}}
        const result = await api.${verb}<${responseTypes}>(\`${route}\`, ${config})
        return result.data
      }`;
  }
  if (!requestBodyComponent && !paramsInPath.length && !queryParam && headerParam) {
    const config = isUpdateRequest ? 'null,{headers}' : '{headers}';
    output += `
      type ${componentName}Params = {
        ${headerParam}
      };
  
      const ${fetchName} = async (headers: ${componentName}Params) => {
        const result = await api.${verb}<${responseTypes}>(\`${route}\`, ${config});
        return result.data;
      }
      `;
  }

  if (requestBodyComponent && !paramsInPath.length && !queryParam && !headerParam) {
    output += `
    type ${componentName}Params = ${requestBodyComponent}

    const ${fetchName} = async (body: ${componentName}Params) => {
      const result = await api.${verb}<${responseTypes}>(\`${route}\`, body)
      return result.data
    } 
      `;
  }

  if (requestBodyComponent && !paramsInPath.length && queryParam && !headerParam) {
    const config = isUpdateRequest ? 'null,{headers, params: queryParams}' : '{headers, params: queryParams}';
    const queryParamsProps = queryParams.map((item) => `["${item.name}"]: props["${item.name}"]`);
    output += `
    type ${componentName}Params = ${requestBodyComponent}  & {
      ${queryParamsType}
    }

    type ${componentName}QueryProps<T = ${responseTypes}> = ${componentName}Params & {
      const body =  {${generateBodyProps()}}
      const params =  {${generateProps(queryParams)}}
      options?: UseQueryOptions<${responseTypes}, AxiosError, T, any> 
    }

     const ${fetchName} = async ({body, params}: ${componentName}Params) => {   
      const queryParams = {${queryParamsProps.join(',')}}
      const result = await api.${verb}<${responseTypes}>(\`${route}\`, ${config})
      return result.data
    }
    `;
  }

  if (requestBodyComponent && !paramsInPath.length && !queryParam && headerParam) {
    output += `
    type ${componentName}Params =  ${requestBodyComponent} & {
      ${headerParam}
    };

    const ${fetchName} = async (props: ${componentName}Params) => {
      const headers = {${generateProps(header)}}
      const body =  {${generateBodyProps()}}
      const result = await api.${verb}<${responseTypes}>(\`${route}\`, body, {headers})
      return result.data
    }
    `;
  }

  if (requestBodyComponent && !paramsInPath.length && queryParam && headerParam) {
    output += `
    type ${componentName}Params = ${requestBodyComponent} & {
      ${headerParam}
      ${paramsTypes}
    };

    const ${fetchName} = async (props: ${componentName}Params) => {
      const body =  {${generateBodyProps()}}
      const headers = {${generateProps(header)}}
      const params =  {${generateProps(queryParams)}}
      const result = await api.${verb}<${responseTypes}>(\`${route}\`, body, {headers, params})
      return result.data
    }
    `;
  }

  if (requestBodyComponent && paramsInPath.length && !queryParam && !headerParam) {
    output += `
    type ${componentName}Params = ${requestBodyComponent} & {
      ${headerParam}
      ${paramsTypes}
    };

    const ${fetchName} = async (props: ${componentName}Params) => {
      const body =  {${generateBodyProps()}}
      const result = await api.${verb}<${responseTypes}>(\`${route.replace(/\{/g, '{props.')}\`, body)
      return result.data
    }
    `;
  }

  if (requestBodyComponent && paramsInPath.length && queryParam && !headerParam) {
    output += `// TODO: NOT SUPPORTED requestBodyComponent && paramsInPath && queryParam)`;
  }

  if (requestBodyComponent && paramsInPath.length && queryParam && headerParam) {
    output += `// TODO: NOT SUPPORTED requestBodyComponent && paramsInPath && queryParam && headerParam)`;
  }

  if (!requestBodyComponent && paramsInPath.length && !queryParam && headerParam) {
    const config = isUpdateRequest ? 'null,{headers}' : '{headers}';
    output += `
    type ${componentName}Params = {
      ${headerParam}
      ${paramsTypes}
    };

    const ${fetchName} = async (props: ${componentName}Params) => {
      const headers = {${generateProps(header)}}
      const result = await api.${verb}<${responseTypes}>(\`${route.replace(/\{/g, '{props.')}\`, ${config})
      return result.data
    }
    `;
  }

  if (!requestBodyComponent && paramsInPath.length && queryParam && headerParam) {
    output += `// TODO: NOT SUPPORTED (paramsInPath && queryParam && headerParam)`;
  }

  if (requestBodyComponent && paramsInPath.length && !queryParam && headerParam) {
    output += `// TODO: NOT SUPPORTED (requestBodyComponent && paramsInPath && headerParam)`;
  }

  return { implementation: output, imports, queryImports };
};
