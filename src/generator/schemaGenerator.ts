import type { OpenAPIV3 } from "openapi-types";
import { sanitizePropertyName, sanitizeTypeName } from "../utils";

interface SchemaContext {
	schemas: { [key: string]: OpenAPIV3.SchemaObject };
	generatedTypes: Set<string>;
}

/**
 * Converts OpenAPI schema type to TypeScript type
 */
function getTypeFromSchema(
	schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject,
	context: SchemaContext
): string {
	if (!schema) return "any";

	if ("$ref" in schema) {
		const refType = schema.$ref.split("/").pop();
		return sanitizeTypeName(refType as string);
	}
	const nullable = schema.nullable ? " | null" : "";

	// Handle enum types properly
	if (schema.enum) {
		return schema.enum.map((e) => (typeof e === "string" ? `'${e}'` : e)).join(" | ") + nullable;
	}

	switch (schema.type) {
		case "string":
			if ("format" in schema && schema.format === "binary") {
				return `string | { name?: string; type?: string; uri: string }${nullable}`;
			}

			return `string${nullable}`;
		case "number":
		case "integer":
			return `number${nullable}`;
		case "boolean":
			return `boolean${nullable}`;
		case "array": {
			const itemType = getTypeFromSchema(schema.items, context);
			return `Array<${itemType}>${nullable}`;
		}
		case "object":
			if (schema.properties) {
				const properties = Object.entries(schema.properties)
					.map(([key, prop]) => {
						const isRequired = schema.required?.includes(key);
						const propertyType = getTypeFromSchema(prop, context);
						const safeName = sanitizePropertyName(key);
						return `  ${safeName}${isRequired ? "" : "?"}: ${propertyType};`;
					})
					.join("\n");
				return `{${properties}\n}${nullable}`;
			}
			if (schema.additionalProperties) {
				const valueType =
					typeof schema.additionalProperties === "boolean"
						? "any"
						: getTypeFromSchema(schema.additionalProperties, context);
				return `Record<string, ${valueType}>${nullable}`;
			}
			return `Record<string, any>${nullable}`;
		default:
			return `any${nullable}`;
	}
}

function generateTypeDefinition(
	name: string,
	schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject,
	context: SchemaContext
): string {
	const description = !("$ref" in schema) && schema.description ? `/**\n * ${schema.description}\n */\n` : "";
	const typeValue = getTypeFromSchema(schema, context);

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
		output += generateTypeDefinition(name, schema, context);
		context.generatedTypes.add(name);
	}

	// Generate request/response types
	if (spec.paths) {
		for (const [path, pathItem] of Object.entries(spec.paths)) {
			for (const [method, operation] of Object.entries(pathItem as OpenAPIV3.PathItemObject)) {
				if (method === "$ref") continue;

				const operationObject = operation as OpenAPIV3.OperationObject;
				if (!operationObject) continue;
				const operationId = `${sanitizeTypeName(operationObject.operationId || `${path.replace(/\W+/g, "_")}`)}`;

				// Generate request body type
				if (operationObject.requestBody) {
					const content = (operationObject.requestBody as OpenAPIV3.RequestBodyObject).content;
					const jsonContent =
						content["application/ld+json"] ??
						content["application/json"] ??
						content["multipart/form-data"] ??
						content["application/octet-stream"];
					if (jsonContent?.schema) {
						const typeName = `${operationId}Request`;
						output += generateTypeDefinition(typeName, jsonContent.schema as OpenAPIV3.SchemaObject, context);
					}
				}

				// Generate response types
				if (operationObject.responses) {
					for (const [code, response] of Object.entries(operationObject.responses)) {
						const responseObj = response as OpenAPIV3.ResponseObject;
						const content =
							responseObj.content?.["application/ld+json"] ??
							responseObj.content?.["application/json"] ??
							responseObj.content?.["application/octet-stream"];
						if (content?.schema) {
							const typeName = `${operationId}Response${code}`;
							output += generateTypeDefinition(typeName, content.schema as OpenAPIV3.SchemaObject, context);
						}
					}
				}
			}
		}
	}

	return output;
}
