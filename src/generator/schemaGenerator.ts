import type { OpenAPIV3 } from "openapi-types";
import { pascalCase, sanitizePropertyName, sanitizeTypeName } from "../utils";

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

	// Handle enum types properly
	if (schema.enum) {
		return schema.enum.map((e) => (typeof e === "string" ? `'${e}'` : e)).join(" | ");
	}

	switch (schema.type) {
		case "string":
			if ("format" in schema && schema.format === "binary") {
				return "string | { name?: string; type?: string; uri: string }";
			}
			return "string";
		case "number":
		case "integer":
			return "number";
		case "boolean":
			return "boolean";
		case "array": {
			const itemType = getTypeFromSchema(schema.items, context);
			return `Array<${itemType}>`;
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
				return `{\n${properties}\n}`;
			}
			if (schema.additionalProperties) {
				const valueType =
					typeof schema.additionalProperties === "boolean"
						? "any"
						: getTypeFromSchema(schema.additionalProperties, context);
				return `Record<string, ${valueType}>`;
			}
			return "Record<string, any>";
		default:
			return "any";
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
		? `${description}export interface ${name} ${typeValue}\n\n`
		: `${description}export type ${name} = ${typeValue}\n\n`;
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
				const operationId = pascalCase(
					`${sanitizeTypeName(operationObject.operationId || `${path.replace(/\W+/g, "_")}`)}`
				);

				// Generate request body type
				if (operationObject.requestBody) {
					const content = (operationObject.requestBody as OpenAPIV3.RequestBodyObject).content;
					const jsonContent = content["application/json"] || content["multipart/form-data"];
					if (jsonContent?.schema) {
						const typeName = sanitizeTypeName(`${operationId}Request`);
						output += generateTypeDefinition(typeName, jsonContent.schema as OpenAPIV3.SchemaObject, context);
					}
				}

				// Generate response types
				if (operationObject.responses) {
					for (const [code, response] of Object.entries(operationObject.responses)) {
						const responseObj = response as OpenAPIV3.ResponseObject;
						const content = responseObj.content?.["application/json"];
						if (content?.schema) {
							const typeName = sanitizeTypeName(`${operationId}Response${code}`);
							output += generateTypeDefinition(typeName, content.schema as OpenAPIV3.SchemaObject, context);
						}
					}
				}
			}
		}
	}

	return output;
}
