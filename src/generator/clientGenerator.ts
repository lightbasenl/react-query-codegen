import type { OpenAPIV3 } from "openapi-types";
import {
	camelCase,
	collectOperations,
	getContentSchema,
	type OperationInfo,
	pascalCase,
	resolveSchema,
	specTitle,
} from "../utils";

function generateAxiosMethod(operation: OperationInfo, spec: OpenAPIV3.Document): string {
	const { method, path, operationId, summary, description, parameters, requestBody, responses } = operation;
	// Generate JSDoc
	const jsDocLines = ["/**"];
	if (summary) jsDocLines.push(` * ${summary}`);
	if (description) jsDocLines.push(` * ${description}`);

	// Add parameter descriptions
	parameters?.forEach((param) => {
		const desc = param.description ? ` - ${param.description}` : "";
		const prefix =
			param.in === "path"
				? "params."
				: param.in === "query"
					? "query."
					: param.in === "header"
						? "headers."
						: "";
		jsDocLines.push(` * @param ${prefix}${param.name}${desc}`);
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
		const contentSchema = getContentSchema(responseObj.content);
		const typeName = pascalCase(`${operationId}Response${code}`);

		if (contentSchema) {
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

	const requestBodyContent = requestBody && "content" in requestBody ? getContentSchema(requestBody.content) : undefined;
	const requestBodySchema = requestBodyContent ? resolveSchema(requestBodyContent, spec) : undefined;

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
		headerParams.length > 0
			? `axiosConfig.headers = { ...axiosConfig.headers, ${headerParams.map((p) => `["${p.name}"]: data["${p.name}"]`).join(", ")} };`
			: "",
		isFormData
			? "axiosConfig.headers = { ...axiosConfig.headers, 'Content-Type': 'multipart/form-data' };"
			: "",
		requestBody
			? `const res = await apiClient.${method}<${responseType}>(url, ${formDataSchema?.properties || requestBodySchema?.properties ? "bodyData" : "data"}, axiosConfig);`
			: `const res = await apiClient.${method}<${responseType}>(url, axiosConfig);`,
		"return res.data;",
	]
		.filter(Boolean)
		.join("\n	");

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
	const operations = collectOperations(spec);
	const title = specTitle(spec);

	return `import type { AxiosRequestConfig } from 'axios';
import { getApiClient } from './apiClient';
import type * as T from './${title}.schema';

${operations.map((op) => generateAxiosMethod(op, spec)).join("\n\n")}`;
}
