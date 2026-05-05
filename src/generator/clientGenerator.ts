import type { OpenAPIV3 } from "openapi-types";
import {
	type OperationInfo,
	camelCase,
	collectOperations,
	getContentSchema,
	pascalCase,
	resolveSchema,
	specTitle,
} from "../utils";

/**
 * Walks a request body schema (including allOf/oneOf/anyOf composition) and returns
 * the union of property names contributed by all branches. Used to pick body fields
 * out of the merged Params object so path/query/header values aren't sent as the body.
 */
function collectBodyPropertyNames(
	schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | undefined,
	spec: OpenAPIV3.Document,
	visitedRefs: Set<string> = new Set()
): string[] {
	if (!schema) return [];
	if ("$ref" in schema) {
		if (visitedRefs.has(schema.$ref)) return [];
		const next = new Set(visitedRefs).add(schema.$ref);
		return collectBodyPropertyNames(resolveSchema(schema, spec), spec, next);
	}
	const names = new Set<string>();
	if (schema.properties) Object.keys(schema.properties).forEach((k) => names.add(k));
	for (const key of ["allOf", "oneOf", "anyOf"] as const) {
		const branches = schema[key];
		if (!branches) continue;
		for (const branch of branches) {
			collectBodyPropertyNames(branch, spec, visitedRefs).forEach((n) => names.add(n));
		}
	}
	return Array.from(names);
}

function generateAxiosMethod(operation: OperationInfo, spec: OpenAPIV3.Document): string {
	const { method, path, operationId, summary, description, deprecated, parameters, requestBody, responses } =
		operation;
	// Generate JSDoc
	const jsDocLines = ["/**"];
	if (deprecated) jsDocLines.push(" * @deprecated");
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
						: param.in === "cookie"
							? "cookies."
							: "";
		jsDocLines.push(` * @param ${prefix}${param.name}${desc}`);
	});

	if (requestBody && "description" in requestBody) {
		jsDocLines.push(` * @param data - ${requestBody.description}`);
	}

	// Add return type description - prefer 2xx responses, fall back to "default"
	const responseDetails =
		Object.entries(responses).find(([code]) => code.startsWith("2")) ||
		Object.entries(responses).find(([code]) => code === "default");
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
	const cookieParams = parameters?.filter((p) => p.in === "cookie") || [];

	const isFormData = requestBody && "content" in requestBody && requestBody.content?.["multipart/form-data"];

	const formDataSchema = isFormData
		? resolveSchema(requestBody.content["multipart/form-data"].schema, spec)
		: undefined;

	const requestBodyContent =
		requestBody && "content" in requestBody ? getContentSchema(requestBody.content) : undefined;
	const requestBodySchema = requestBodyContent ? resolveSchema(requestBodyContent, spec) : undefined;

	// Resolve property names contributed by the body schema, walking allOf/oneOf/anyOf so
	// composition-based bodies are still treated as object bodies (not "primitive").
	const bodyPropertyNames = requestBodySchema ? collectBodyPropertyNames(requestBodySchema, spec) : [];
	const hasObjectBody = bodyPropertyNames.length > 0;

	// Check if request body is a primitive type (string, number, boolean)
	const isPrimitiveRequestBody =
		requestBodySchema &&
		!hasObjectBody &&
		!requestBodySchema.type?.includes("object") &&
		!requestBodySchema.type?.includes("array");

	// Add request body type if it exists
	const hasData = (parameters && parameters.length > 0) || operation.requestBody;

	const namedType = pascalCase(operationId);

	// Get response type from 2xx response
	const responseType = (() => {
		if (!responseDetails) return "unknown";
		const [code, response] = responseDetails;
		// If response has content, use the generated type
		if ("content" in response && response.content) {
			return `T.${namedType}Response${code}`;
		}
		// 204 (No Content) and 205 (Reset Content) should return void
		if (code === "204" || code === "205") {
			return "void";
		}
		return "unknown";
	})();

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

		hasObjectBody && !formDataSchema?.properties
			? `const bodyData = {
				${bodyPropertyNames.map((key) => `["${key}"]: data["${key}"]`).join(",\n				")}
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
		cookieParams.length > 0
			? `axiosConfig.headers = { ...axiosConfig.headers, Cookie: [${cookieParams.map((p) => `data["${p.name}"] != null ? \`${p.name}=\${data["${p.name}"]}\` : null`).join(", ")}].filter(Boolean).join("; ") };`
			: "",
		// Note: Don't set Content-Type for FormData - Axios will set it automatically with the correct boundary
		requestBody
			? responseType === "void"
				? `await apiClient.${method}<${responseType}>(url, ${formDataSchema?.properties || hasObjectBody ? "bodyData" : "data"}, axiosConfig);`
				: `const res = await apiClient.${method}<${responseType}>(url, ${formDataSchema?.properties || hasObjectBody ? "bodyData" : "data"}, axiosConfig);`
			: responseType === "void"
				? `await apiClient.${method}<${responseType}>(url, axiosConfig);`
				: `const res = await apiClient.${method}<${responseType}>(url, axiosConfig);`,
		responseType !== "void" ? "return res.data;" : "",
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
