import type { OpenAPIV3 } from "openapi-types";
import {
	collectOperations,
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

	// Generate request/response types. Use the same operation-collection helper as the
	// client generator so pathItem-level parameters and $ref parameters stay in sync.
	for (const { operationId, parameters, requestBody, responses } of collectOperations(spec)) {
		// Generate request body type
		if (requestBody) {
			const requestSchema = getContentSchema(requestBody.content);
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

		const urlParams = parameters.filter((p) => p.in === "path");
		const queryParams = parameters.filter((p) => p.in === "query");
		const headerParams = parameters.filter((p) => p.in === "header");
		const cookieParams = parameters.filter((p) => p.in === "cookie");

		// Add path, query, header, and cookie parameters
		urlParams.forEach((p) => dataProps.push(formatParamProperty(p, true))); // Path params always required
		queryParams.forEach((p) => dataProps.push(formatParamProperty(p)));
		headerParams.forEach((p) => dataProps.push(formatParamProperty(p)));
		cookieParams.forEach((p) => dataProps.push(formatParamProperty(p)));

		// Add request body type if it exists
		const hasData = parameters.length > 0 || requestBody;

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

	return output;
}
