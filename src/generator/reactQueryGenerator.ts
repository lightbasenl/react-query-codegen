import type { OpenAPIV3 } from "openapi-types";
import {
	camelCase,
	collectOperations,
	getContentSchema,
	type OperationInfo,
	resolveSchema,
	specTitle,
} from "../utils";

function generateQueryOptions(operation: OperationInfo, spec: OpenAPIV3.Document): string {
	const { operationId, parameters, requestBody } = operation;

	const hasData = (parameters && parameters.length > 0) || operation.requestBody;

	// Helper to get required fields from a schema
	const getRequiredFields = (
		schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject,
		context: { schemas: { [key: string]: OpenAPIV3.SchemaObject } }
	): string[] => {
		if ("$ref" in schema) {
			const refType = schema.$ref.split("/").pop();
			const refSchema = context.schemas[refType as string];
			return refSchema?.required?.map((p) => `'${p}'`) || [];
		}
		return schema.required?.map((p) => `'${p}'`) || [];
	};

	const content = requestBody && "content" in requestBody ? getContentSchema(requestBody.content) : undefined;
	const requestBodySchema = content ? resolveSchema(content, spec) : undefined;

	// Check if request body is a primitive type (string, number, boolean)
	const isPrimitiveRequestBody =
		requestBodySchema &&
		!requestBodySchema.properties &&
		!requestBodySchema.type?.includes("object") &&
		!requestBodySchema.type?.includes("array");

	// Get required parameter names from both parameters and request body
	const requiredParams = [
		...(parameters?.filter((p) => p.required).map((p) => `'${p.name}'`) || []),
		...(content
			? getRequiredFields(content, {
					schemas: (spec.components?.schemas as { [key: string]: OpenAPIV3.SchemaObject }) || {},
				})
			: []),
		...(requestBody && "content" in requestBody && requestBody.content?.["multipart/form-data"]?.schema
			? getRequiredFields(requestBody.content["multipart/form-data"].schema, {
					schemas: (spec.components?.schemas as { [key: string]: OpenAPIV3.SchemaObject }) || {},
				})
			: []),
	];

	const namedQueryOptions = camelCase(`get${operationId}QueryOptions`);
	const namedQuery = camelCase(`${operationId}`);

	// Handle destructuring based on whether we have primitive request body
	const destructuringLine = hasData
		? isPrimitiveRequestBody
			? "const { axiosConfig, data } = props || {};"
			: "const { axiosConfig, ...params } = props || {};"
		: "const { axiosConfig } = props || {};";

	const paramsVariable = hasData ? (isPrimitiveRequestBody ? "data" : "params") : "";

	const queryKeyParams = hasData ? paramsVariable : "";

	const functionCall = hasData
		? isPrimitiveRequestBody
			? "{data, axiosConfig}"
			: "{...params, axiosConfig}"
		: "{axiosConfig}";

	// Handle enabled logic based on request body type
	const enabledLogic = hasData
		? isPrimitiveRequestBody
			? "!!data"
			: `hasDefinedProps(${paramsVariable}, ${requiredParams.join(", ")})`
		: "true";

	return `
export const ${namedQueryOptions} = ( 
  ${hasData ? `props: Partial<Parameters<typeof apiClient.${namedQuery}>[0]>` : `props?: Partial<Parameters<typeof apiClient.${namedQuery}>[0]>`}
) => {
  ${destructuringLine}
  const enabled = ${enabledLogic};
  return queryOptions({
    queryKey: ['${camelCase(operationId)}', ${queryKeyParams}],
    queryFn: enabled ? () => apiClient.${namedQuery}(${functionCall}) : skipToken,
  });
};`;
}

export function generateReactQuery(spec: OpenAPIV3.Document): string {
	const operations = collectOperations(spec);

	return `import { queryOptions, skipToken } from '@tanstack/react-query';
	import * as apiClient from './${specTitle(spec)}.client';
	// TEMPORARY: allows for backward compatibility imports
	export * from './${specTitle(spec)}.client';

const hasDefinedProps = <T extends { [P in K]?: any }, K extends PropertyKey>(
  obj: T,
  ...keys: K[]
): obj is T & { [P in K]-?: Exclude<T[P], undefined> } => {
  return keys.every((k) => obj[k] !== undefined);
};

${operations.map((op) => generateQueryOptions(op, spec)).join("\n\n")}
`;
}
