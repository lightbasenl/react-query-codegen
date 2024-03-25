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
}: {
  operation: OperationObject;
  verb: string;
  route: string;
  operationIds: string[];
  parameters: (ReferenceObject | ParameterObject)[] | undefined;
  schemasComponents?: ComponentsObject;
  headerFilters?: string[];
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

  const fetchName = camel(componentName);

  const createQueryHooks = (emptyParams?: boolean) => {
    const key = emptyParams ? '' : `params`;
    const queryParamType = emptyParams ? '' : `${componentName}Params`;
    const queryKey = emptyParams
      ? `["${componentName.toLowerCase()}"]`
      : `["${componentName.toLowerCase()}", params]`;
    const props = emptyParams ? `props?` : `params`;
    const propTest = emptyParams ? '' : `${props}: ${queryParamType}`;
    const createQuery = () => `
    export function get${componentName}QueryOptions(${propTest}) { 
      return queryOptions({
        queryKey: ${queryKey},
        queryFn: () => ${fetchName}(${key}), 
      });
    }`;

    queryImports.push('query');
    return createQuery();
  };

  output += createQueryHooks(!requestBodyComponent && !paramsInPath.length && !queryParam && !headerParam);

  const hasRequestBodyArrray = requestBodyComponent && requestBodyComponent.includes('[]');
  const body = hasRequestBodyArrray ? `{body: ${requestBodyComponent}}` : `${requestBodyComponent}`;
  const bodyProps = hasRequestBodyArrray ? `{body, ...props}` : 'props';

  const generateProps = (props: ParameterObject[]) => {
    return props.map((item) => `["${item.name}"]: props["${item.name}"]`).join(',');
  };

  const generateBodyProps = () => {
    const definitionKey = Object.keys(schemasComponents?.schemas || {}).find(
      (key) => pascal(key) === requestBodyComponent
    );

    if (definitionKey && !hasRequestBodyArrray) {
      const scheme = schemasComponents?.schemas?.[definitionKey] as SchemaObject;
      const generatedBodyProps = Object.keys(scheme.properties as SchemaObject)
        .map((item: string) => `["${item}"]: props["${item}"]`)
        .join(',');
      return `const body = {${generatedBodyProps}}`;
    }

    return '';
  };

  if (!requestBodyComponent && !paramsInPath.length && !queryParam && !headerParam) {
    output += `
    export const ${fetchName} = async () => {
      const result = await api.${verb}<${responseTypes}>(\`${route}\`);
      return result.data;
    }
    `;
  }
  if (!requestBodyComponent && paramsInPath.length && queryParam && !headerParam) {
    const config = isUpdateRequest ? 'undefined,{params}' : '{params}';
    output += `
    export type ${componentName}Params = {
      ${paramsTypes}
      ${queryParamsType}; 
    }

     export const ${fetchName} = async (props:${componentName}Params) => {
      const {${paramsInPath.join(', ')}, ...params} = props
      const result = await api.${verb}<${responseTypes}>(\`${route}\`, ${config})
      return result.data;
    }`;
  }
  if (!requestBodyComponent && paramsInPath.length && !queryParam && !headerParam) {
    output += `
    export type ${componentName}Params = {
      ${paramsTypes}
    }

    export const ${fetchName} = async (props: ${componentName}Params ) => {
      const result = await api.${verb}<${responseTypes}>(\`${route.replace(/\{/g, '{props.')}\`);
      return result.data;
    }
    `;
  }
  if (!requestBodyComponent && !paramsInPath.length && queryParam && !headerParam) {
    const config = isUpdateRequest ? 'null,{params}' : '{params}';
    output += `
    export type ${componentName}Params = { 
      ${queryParamsType} 
    }

    export const ${fetchName} = async (params: ${componentName}Params) => {
      const result = await api.${verb}<${responseTypes}>(\`${route}\`, ${config})
      return result.data;
    }
    `;
  }
  if (!requestBodyComponent && !paramsInPath.length && queryParam && headerParam) {
    const config = isUpdateRequest ? 'null,{headers, params: queryParams}' : '{headers, params: queryParams}';
    output += `
      export type ${componentName}Params = {
        ${headerParam}
        ${queryParamsType}
      }
      export const ${fetchName} = async (props: ${componentName}Params) => {
        const headers = {${generateProps(header)}}
        const queryParams = {${generateProps(queryParams)}}
        const result = await api.${verb}<${responseTypes}>(\`${route}\`, ${config})
        return result.data
      }`;
  }
  if (!requestBodyComponent && !paramsInPath.length && !queryParam && headerParam) {
    const config = isUpdateRequest ? 'null,{headers}' : '{headers}';
    output += `
          export type ${componentName}Params = {
        ${headerParam}
      };
  
      export const ${fetchName} = async (headers: ${componentName}Params) => {
        const result = await api.${verb}<${responseTypes}>(\`${route}\`, ${config});
        return result.data;
      }
      `;
  }
  if (requestBodyComponent && !paramsInPath.length && !queryParam && !headerParam) {
    output += `

    export type ${componentName}Params = ${requestBodyComponent}

    export const ${fetchName} = async (body: ${componentName}Params) => {
      const result = await api.${verb}<${responseTypes}>(\`${route}\`, body)
      return result.data
    } 
      `;
  }
  if (requestBodyComponent && !paramsInPath.length && queryParam && !headerParam) {
    output += `
      export type ${componentName}Params =  ${body} & {
        ${queryParamsType}
      }

     export const ${fetchName} = async (${bodyProps}: ${componentName}Params) => {   
      ${generateBodyProps()}
      const params =  {${generateProps(queryParams)}}
      const result = await api.${verb}<${responseTypes}>(\`${route}\`, body, {params})
      return result.data
    }
    `;
  }
  if (requestBodyComponent && !paramsInPath.length && !queryParam && headerParam) {
    output += `
    export type ${componentName}Params =  ${body} & {
      ${headerParam}
    };

    export const ${fetchName} = async (${bodyProps}: ${componentName}Params) => {
      ${generateBodyProps()}
      const headers = {${generateProps(header)}}
      const result = await api.${verb}<${responseTypes}>(\`${route}\`, body, {headers})
      return result.data
    }
    `;
  }
  if (requestBodyComponent && !paramsInPath.length && queryParam && headerParam) {
    output += `
    export type ${componentName}Params = ${body} & {
      ${headerParam}
      ${paramsTypes}
    };
    export const ${fetchName} = async (${bodyProps}: ${componentName}Params) => {
      ${generateBodyProps()}
      const headers = {${generateProps(header)}}
      const params =  {${generateProps(queryParams)}}
      const result = await api.${verb}<${responseTypes}>(\`${route}\`, body, {headers, params})
      return result.data
    }
    `;
  }
  if (requestBodyComponent && paramsInPath.length && !queryParam && !headerParam) {
    output += `
    export type ${componentName}Params = ${body} & {
      ${headerParam}
      ${paramsTypes}
    };
// TEST1
    export const ${fetchName} = async (${bodyProps}: ${componentName}Params) => {
      ${generateBodyProps()}
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
    export type ${componentName}Params = {
      ${headerParam}
      ${paramsTypes}
    };

    export const ${fetchName} = async (props: ${componentName}Params) => {
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
