import type { OpenAPIV3 } from "openapi-types";
import { camelCase, sanitizeTypeName, specTitle } from "../utils";
import type { OperationInfo } from "./clientGenerator";

function resolveSchema(
	schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject | undefined,
	spec: OpenAPIV3.Document
): OpenAPIV3.SchemaObject | undefined {
	if (!schema) return undefined;
	if ("$ref" in schema) {
		const index = schema.$ref.split("/").pop();
		return spec.components?.schemas?.[index as string] as OpenAPIV3.SchemaObject;
	}
	return schema;
}

function generateQueryOptions(operation: OperationInfo, spec: OpenAPIV3.Document): string {
	const { operationId, parameters, requestBody, method } = operation;

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

	const content =
		requestBody && "content" in requestBody
			? (requestBody.content?.["application/ld+json"]?.schema ??
				requestBody.content?.["application/json"]?.schema ??
				requestBody.content?.["application/octet-stream"]?.schema)
			: undefined;

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
	const operations: OperationInfo[] = [];

	// Collect operations (same as in clientGenerator)
	Object.entries(spec.paths || {}).forEach(([path, pathItem]) => {
		if (!pathItem) return;

		["get", "post", "put", "delete", "patch"].forEach((method) => {
			const operation = pathItem[method as keyof OpenAPIV3.PathItemObject] as OpenAPIV3.OperationObject;
			if (!operation) return;
			operations.push({
				method: method,
				path,
				operationId: sanitizeTypeName(`${operation.operationId || `${path.replace(/\W+/g, "_")}`}`),
				summary: operation.summary,
				description: operation.description,
				parameters: [
					...(pathItem.parameters || []),
					...(operation.parameters || []),
				] as OpenAPIV3.ParameterObject[],
				requestBody: operation.requestBody as OpenAPIV3.RequestBodyObject,
				responses: operation.responses,
			});
		});
	});

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
