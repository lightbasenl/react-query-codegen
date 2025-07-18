import type { OpenAPIV3 } from "openapi-types";
import { camelCase, pascalCase, sanitizeTypeName, specTitle } from "../utils";

export interface OperationInfo {
	method: string;
	path: string;
	operationId: string;
	summary?: string;
	description?: string;
	parameters?: OpenAPIV3.ParameterObject[];
	requestBody?: OpenAPIV3.RequestBodyObject;
	responses: OpenAPIV3.ResponsesObject;
}

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

function generateAxiosMethod(operation: OperationInfo, spec: OpenAPIV3.Document): string {
	const { method, path, operationId, summary, description, parameters, requestBody, responses } = operation;
	// Generate JSDoc
	const jsDocLines = ["/**"];
	if (summary) jsDocLines.push(` * ${summary}`);
	if (description) jsDocLines.push(` * ${description}`);

	// Add parameter descriptions
	parameters?.forEach((param) => {
		const desc = param.description ? ` - ${param.description}` : "";
		jsDocLines.push(
			` * @param ${param.in === "path" ? "params." : param.in === "query" ? "query." : ""}${param.name}${desc}`
		);
	});

	if (requestBody && "description" in requestBody) {
		jsDocLines.push(` * @param data - ${requestBody.description}`);
	}

	// Add return type description
	const responseDetails = Object.entries(responses).find(([code]) => code.startsWith("2"));
	if (responseDetails) {
		const [code, response] = responseDetails;
		const responseObj = response as OpenAPIV3.ResponseObject;
		const desc = "description" in responseObj ? responseObj.description : "";
		const contentType =
			responseObj.content?.["application/ld+json"]?.schema ??
			responseObj.content?.["application/json"]?.schema ??
			responseObj.content?.["application/octet-stream"]?.schema ??
			responseObj.content?.["application/json;charset=UTF-8"]?.schema;

		const typeName = pascalCase(`${operationId}Response${code}`);

		if (contentType) {
			if (desc) {
				jsDocLines.push(` * @returns ${desc}`);
			}
			jsDocLines.push(` * @see ${typeName}`);
		} else if (desc) {
			jsDocLines.push(` * @returns ${desc}`);
		}
	}

	jsDocLines.push(" */");

	const urlParams = parameters?.filter((p) => p.in === "path") || [];
	const queryParams = parameters?.filter((p) => p.in === "query") || [];
	const headerParams = parameters?.filter((p) => p.in === "header") || [];

	const isFormData = requestBody && "content" in requestBody && requestBody.content?.["multipart/form-data"];

	const formDataSchema = isFormData
		? resolveSchema(requestBody.content["multipart/form-data"].schema, spec)
		: undefined;

	const content =
		requestBody && "content" in requestBody
			? (requestBody.content?.["application/ld+json"]?.schema ??
				requestBody.content?.["application/json"]?.schema ??
				requestBody.content?.["application/octet-stream"]?.schema ??
				requestBody.content?.["application/json;charset=UTF-8"]?.schema)
			: undefined;

	const requestBodySchema = content ? resolveSchema(content, spec) : undefined;

	// Check if request body is a primitive type (string, number, boolean)
	const isPrimitiveRequestBody =
		requestBodySchema &&
		!requestBodySchema.properties &&
		!requestBodySchema.type?.includes("object") &&
		!requestBodySchema.type?.includes("array");

	// Add request body type if it exists
	const hasData = (parameters && parameters.length > 0) || operation.requestBody;

	const namedType = pascalCase(operationId);

	// Get response type from 2xx response

	const responseType =
		responseDetails?.[0] && "content" in responseDetails[1]
			? `T.${`${namedType}Response${responseDetails[0]}`}`
			: "unknown";

	const urlWithParams =
		urlParams.length > 0 ? `\`${path.replace(/{(\w+)}/g, "${encodeURIComponent(data.$1)}")}\`` : `"${path}"`;

	// Handle destructuring based on whether we have primitive request body
	const destructuringLine = hasData
		? isPrimitiveRequestBody
			? "const { axiosConfig = {}, data } = props || {};"
			: "const { axiosConfig = {}, ...data } = props || {};"
		: "const { axiosConfig } = props || {};";

	const methodBody = [
		destructuringLine,
		"const apiClient = getApiClient();",
		`const url = ${urlWithParams};`,
		queryParams.length > 0
			? `const queryData = {
			${queryParams.map((p) => `["${p.name}"]: data["${p.name}"]`).join(",\n				")}
		};`
			: "",

		requestBodySchema?.properties
			? `const bodyData = {
				${Object.entries(requestBodySchema.properties)
					.map(([key]) => `["${key}"]: data["${key}"]`)
					.join(",\n				")}
			};`
			: "",

		formDataSchema?.properties
			? `const bodyData = new FormData();
			${Object.entries(formDataSchema.properties)
				.map(([key, prop]) => {
					const schemaProperty = prop as OpenAPIV3.SchemaObject;
					const isBinary = schemaProperty.format === "binary";
					return formDataSchema?.required?.includes(key)
						? `bodyData.append("${key}", ${isBinary ? "" : "String("}data.${key}${isBinary ? "" : ")"});`
						: `if (data.${key} != null) {
							bodyData.append("${key}", ${isBinary ? "" : "String("}data.${key}${isBinary ? "" : ")"});
						}`;
				})
				.join("\n			")}`
			: "",
		queryParams.length > 0 ? "axiosConfig.params = { ...axiosConfig.params, ...queryData };" : "",
		isFormData
			? "axiosConfig.headers = { ...axiosConfig.headers, 'Content-Type': 'multipart/form-data' };"
			: "",
		headerParams.length > 0
			? `const headerData = {
			${headerParams.map((p) => `["${p.name}"]: data["${p.name}"]`).join(",\n				")}
		};`
			: "",
		headerParams.length > 0 ? "axiosConfig.headers = { ...axiosConfig.headers, ...headerData };" : "",
		requestBody
			? `const res = await apiClient.${method}<${responseType}>(url, ${formDataSchema?.properties || requestBodySchema?.properties ? "bodyData" : "data"}, axiosConfig);`
			: `const res = await apiClient.${method}<${responseType}>(url, axiosConfig);`,
		"return res.data;",
	]
		.filter(Boolean)
		.join("\n	");

	// ${queryParams.length > 0 ? "params: queryData," : ""}
	// ${requestBody ? `data: ${isFormData ? "formData" : "bodyData"},` : ""}
	// ${isFormData ? `config: { headers: { 'Content-Type': 'multipart/form-data', ...axiosConfig?.headers }, ...axiosConfig },` : "...axiosConfig"}

	const requestParms = hasData
		? isPrimitiveRequestBody
			? `props: { data: T.${pascalCase(operationId)}Params; axiosConfig?: AxiosRequestConfig; }`
			: `props: T.${pascalCase(operationId)}Params & { axiosConfig?: AxiosRequestConfig; }`
		: "props?: { axiosConfig?: AxiosRequestConfig }";

	return `
	${jsDocLines.join("\n	")}
	export async function ${camelCase(operationId)}(${requestParms}): Promise<${responseType}> {
		${methodBody}
	}`;
}

export function generateApiClient(spec: OpenAPIV3.Document): string {
	const operations: OperationInfo[] = [];

	const resolveParameters = (
		parameters: (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[]
	): OpenAPIV3.ParameterObject[] => {
		return parameters.map((p) => {
			if ("$ref" in p) {
				const index = p.$ref.split("/").pop();
				return spec.components?.schemas?.[index as string] as OpenAPIV3.ParameterObject;
			}
			return p;
		});
	};

	const resolveRequestBody = (
		requestBody: OpenAPIV3.RequestBodyObject | OpenAPIV3.ReferenceObject | undefined
	): OpenAPIV3.RequestBodyObject | undefined => {
		if (!requestBody) return undefined;
		if ("$ref" in requestBody) {
			const index = requestBody.$ref.split("/").pop();
			return spec.components?.schemas?.[index as string] as OpenAPIV3.RequestBodyObject;
		}
		return requestBody;
	};

	// Collect all operations
	Object.entries(spec.paths || {}).forEach(([path, pathItem]) => {
		if (!pathItem) return;
		["get", "post", "put", "delete", "patch"].forEach((method) => {
			const operation = pathItem[method as keyof OpenAPIV3.PathItemObject] as OpenAPIV3.OperationObject;
			if (!operation) return;
			operations.push({
				method: method,
				path,
				operationId: `${sanitizeTypeName(operation.operationId || `${path.replace(/\W+/g, "_")}`)}`,
				summary: operation.summary,
				description: operation.description,
				parameters: resolveParameters([...(pathItem.parameters || []), ...(operation.parameters || [])]),
				requestBody: resolveRequestBody(operation.requestBody),
				responses: operation.responses,
			});
		});
	});

	const title = specTitle(spec);

	return `import type { AxiosResponse, AxiosRequestConfig } from 'axios';
import { getApiClient } from './apiClient';
import type * as T from './${title}.schema';

${operations.map((op) => generateAxiosMethod(op, spec)).join("\n\n")}`;
}
