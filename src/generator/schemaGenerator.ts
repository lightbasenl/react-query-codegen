import type { OpenAPIV3 } from "openapi-types";
import { getTypeFromSchema, pascalCase, sanitizePropertyName, sanitizeTypeName } from "../utils";

interface SchemaContext {
	schemas: { [key: string]: OpenAPIV3.SchemaObject };
	generatedTypes: Set<string>;
}

function generateTypeDefinition(
	name: string,
	schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject
): string {
	const description = !("$ref" in schema) && schema.description ? `/**\n * ${schema.description}\n */\n` : "";
	const typeValue = getTypeFromSchema(schema);

	// Use 'type' for primitives, unions, and simple types
	// Use 'interface' only for complex objects with properties
	const isInterface = !("$ref" in schema) && schema.type === "object" && schema.properties;

	return isInterface
		? `${description}export interface ${sanitizeTypeName(name)} ${typeValue}\n\n`
		: `${description}export type ${sanitizeTypeName(name)} = ${typeValue}\n\n`;
}

/**
 * Generates TypeScript interface definitions from OpenAPI schemas
 */
export function generateTypeDefinitions(spec: OpenAPIV3.Document): string {
	const context: SchemaContext = {
		schemas: (spec.components?.schemas as { [key: string]: OpenAPIV3.SchemaObject }) || {},
		generatedTypes: new Set(),
	};

	let output = "/* Generated TypeScript Definitions */\n\n";

	// Generate types for all schema definitions
	for (const [name, schema] of Object.entries(context.schemas)) {
		if (context.generatedTypes.has(name)) continue;
		output += generateTypeDefinition(name, schema);
		context.generatedTypes.add(name);
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
					const jsonContent =
						content["application/ld+json"] ??
						content["application/json"] ??
						content["multipart/form-data"] ??
						content["application/octet-stream"] ??
						content["application/json;charset=UTF-8"];
					if (jsonContent?.schema) {
						const typeName = `${operationId}Request`;
						output += generateTypeDefinition(typeName, jsonContent.schema as OpenAPIV3.SchemaObject);
					}
				}

				// Generate response types
				if (responses) {
					for (const [code, response] of Object.entries(responses)) {
						const responseObj = response as OpenAPIV3.ResponseObject;
						const content =
							responseObj.content?.["application/ld+json"] ??
							responseObj.content?.["application/json"] ??
							responseObj.content?.["application/octet-stream"] ??
							responseObj.content?.["application/json;charset=UTF-8"];
						if (content?.schema) {
							const typeName = `${operationId}Response${code}`;
							output += generateTypeDefinition(typeName, content.schema as OpenAPIV3.SchemaObject);
						}
					}
				}

				// Build data type parts
				const dataProps: string[] = [];

				const urlParams = (parameters?.filter((p) => "in" in p && p.in === "path") ||
					[]) as OpenAPIV3.ParameterObject[];
				const queryParams = (parameters?.filter((p) => "in" in p && p.in === "query") ||
					[]) as OpenAPIV3.ParameterObject[];

				// Add path and query parameters
				urlParams.forEach((p) => {
					const safeName = sanitizePropertyName(p.name);
					const isDeprecated = "deprecated" in p && p.deprecated;
					const hasDescription = "description" in p && p.description;
					const desc =
						hasDescription || isDeprecated
							? `/**${hasDescription ? `\n* ${p.description}` : ""}${isDeprecated ? "\n* @deprecated" : ""}
							*/\n`
							: "";
					dataProps.push(`${desc}${safeName}: ${getTypeFromSchema(p.schema)}`);
				});

				queryParams.forEach((p) => {
					const safeName = sanitizePropertyName(p.name);
					const isDeprecated = "deprecated" in p && p.deprecated;
					const hasDescription = "description" in p && p.description;
					const desc =
						hasDescription || isDeprecated
							? `\n/**${hasDescription ? `\n* ${p.description}` : ""}${isDeprecated ? "\n* @deprecated" : ""}
							*/\n`
							: "";
					dataProps.push(`${desc}${safeName}${p.required ? "" : "?"}: ${getTypeFromSchema(p.schema)}`);
				});
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
