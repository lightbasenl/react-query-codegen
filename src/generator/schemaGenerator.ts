import type { OpenAPIV3 } from "openapi-types";
import {
	getContentSchema,
	getTypeFromSchema,
	pascalCase,
	sanitizePropertyName,
	sanitizeTypeName,
} from "../utils";

/**
 * Formats a parameter as a TypeScript property string with optional JSDoc.
 */
function formatParamProperty(param: OpenAPIV3.ParameterObject, forceRequired = false): string {
	const safeName = sanitizePropertyName(param.name);
	const isDeprecated = param.deprecated;
	const hasDescription = param.description;
	const isOptional = forceRequired ? false : !param.required;

	const desc =
		hasDescription || isDeprecated
			? `/**${hasDescription ? `\n * ${param.description}` : ""}${isDeprecated ? "\n * @deprecated" : ""}\n */\n`
			: "";

	return `${desc}${safeName}${isOptional ? "?" : ""}: ${getTypeFromSchema(param.schema)}`;
}

function generateTypeDefinition(
	name: string,
	schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject
): string {
	const description = !("$ref" in schema) && schema.description ? `/**\n * ${schema.description}\n */\n` : "";
	const typeValue = getTypeFromSchema(schema);

	// Only emit `interface` when the body is a plain object literal. Composition
	// (allOf/oneOf/anyOf) produces references or intersections that must use a type alias.
	const canBeInterface = typeValue?.trimStart().startsWith("{");

	return canBeInterface
		? `${description}export interface ${sanitizeTypeName(name)} ${typeValue}\n\n`
		: `${description}export type ${sanitizeTypeName(name)} = ${typeValue}\n\n`;
}

/**
 * Generates TypeScript interface definitions from OpenAPI schemas
 */
export function generateTypeDefinitions(spec: OpenAPIV3.Document): string {
	const schemas = (spec.components?.schemas as { [key: string]: OpenAPIV3.SchemaObject }) || {};
	const generatedTypes = new Set<string>();

	let output = "/* Generated TypeScript Definitions */\n\n";

	// Generate types for all schema definitions
	for (const [name, schema] of Object.entries(schemas)) {
		if (generatedTypes.has(name)) continue;
		output += generateTypeDefinition(name, schema);
		generatedTypes.add(name);
	}

	// Generate request/response types
	if (spec.paths) {
		for (const [path, pathItem] of Object.entries(spec.paths)) {
			for (const [method, operation] of Object.entries(pathItem as OpenAPIV3.PathItemObject)) {
				if (method === "$ref") continue;

				const operationObject = operation as OpenAPIV3.OperationObject;
				if (!operationObject) continue;
				const { operationId: badOperationId, requestBody, responses, parameters } = operationObject;
				const operationId = `${sanitizeTypeName(badOperationId || `${path.replace(/\W+/g, "_")}`)}`;

				// Generate request body type
				if (requestBody) {
					const content = (requestBody as OpenAPIV3.RequestBodyObject).content;
					const requestSchema = getContentSchema(content);
					if (requestSchema) {
						const typeName = `${operationId}Request`;
						output += generateTypeDefinition(typeName, requestSchema as OpenAPIV3.SchemaObject);
					}
				}

				// Generate response types
				const errorTypes: string[] = [];
				if (responses) {
					for (const [code, response] of Object.entries(responses)) {
						const responseObj = response as OpenAPIV3.ResponseObject;
						const responseSchema = getContentSchema(responseObj.content);
						if (responseSchema) {
							const typeName = `${operationId}Response${code}`;
							output += generateTypeDefinition(typeName, responseSchema as OpenAPIV3.SchemaObject);

							// Track non-2xx responses for error union type
							if (!code.startsWith("2")) {
								errorTypes.push(typeName);
							}
						}
					}
				}

				// Generate error union type if there are error responses
				if (errorTypes.length > 0) {
					output += `export type ${pascalCase(operationId)}Error = ${errorTypes.join(" | ")};\n\n`;
				}

				// Build data type parts
				const dataProps: string[] = [];

				const urlParams = (parameters?.filter((p) => "in" in p && p.in === "path") ||
					[]) as OpenAPIV3.ParameterObject[];
				const queryParams = (parameters?.filter((p) => "in" in p && p.in === "query") ||
					[]) as OpenAPIV3.ParameterObject[];
				const headerParams = (parameters?.filter((p) => "in" in p && p.in === "header") ||
					[]) as OpenAPIV3.ParameterObject[];
				const cookieParams = (parameters?.filter((p) => "in" in p && p.in === "cookie") ||
					[]) as OpenAPIV3.ParameterObject[];

				// Add path, query, header, and cookie parameters
				urlParams.forEach((p) => dataProps.push(formatParamProperty(p, true))); // Path params always required
				queryParams.forEach((p) => dataProps.push(formatParamProperty(p)));
				headerParams.forEach((p) => dataProps.push(formatParamProperty(p)));
				cookieParams.forEach((p) => dataProps.push(formatParamProperty(p)));

				// Add request body type if it exists
				const hasData = (parameters && parameters.length > 0) || requestBody;

				let dataType = "undefined";
				const namedType = pascalCase(operationId);
				if (hasData) {
					if (requestBody && dataProps.length > 0) {
						dataType = `${namedType}Request & { ${dataProps.join("; ")} }`;
					} else if (requestBody) {
						dataType = `${namedType}Request`;
					} else if (dataProps.length > 0) {
						dataType = `{ ${dataProps.join("; ")} }`;
					} else {
						dataType = "Record<string, never>";
					}
					output += `\n\nexport type ${pascalCase(operationId)}Params = ${dataType};\n\n`;
				}
			}
		}
	}

	return output;
}
