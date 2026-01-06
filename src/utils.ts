import type { OpenAPIV3 } from "openapi-types";

export function camelCase(str: string): string {
	return str
		.replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
		.replace(/^[A-Z]/, (c) => c.toLowerCase());
}

export function pascalCase(str: string): string {
	return str
		.replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
		.replace(/^[a-z]/, (c) => c.toUpperCase());
}

/**
 * Sanitizes a property name to ensure it's a valid JavaScript identifier.
 * If the name is already a valid identifier (starts with letter/underscore/$ and contains only letters/numbers/underscore/$),
 * returns it as-is. Otherwise wraps it in quotes to make it a valid property accessor.
 *
 * For example:
 * - sanitizePropertyName("validName") => "validName"
 * - sanitizePropertyName("invalid-name") => "'invalid-name'"
 * - sanitizePropertyName("123invalid") => "'123invalid'"
 *
 * @param name The property name to sanitize
 * @returns The sanitized property name, quoted if needed
 */
export function sanitizePropertyName(name: string): string {
	return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name) ? name : `'${name}'`;
}

/**
 * Sanitizes a type name to ensure it's a valid TypeScript type identifier.
 * Replaces any characters that aren't alphanumeric or underscore with an underscore.
 *
 * For example:
 * - sanitizeTypeName("ValidType") => "ValidType"
 * - sanitizeTypeName("invalid-type") => "invalid_type"
 * - sanitizeTypeName("type.name") => "type_name"
 * - sanitizeTypeName("type/name") => "type_name"
 *
 * This is used to convert operation IDs and response names from the OpenAPI spec
 * into valid TypeScript type names.
 *
 * @param name The type name to sanitize
 * @returns The sanitized type name with invalid characters replaced by underscores
 */
export function sanitizeTypeName(name: string): string {
	return pascalCase(name.replace(/[^a-zA-Z0-9_]/g, "_").replace(/_+$/, ""));
}

export function specTitle(spec: OpenAPIV3.Document): string {
	const title = spec.info.title ?? "openAPi";
	if (!spec.info.title) {
		console.warn("No title found in OpenAPI spec, using 'openAPi' as default");
	}
	return camelCase(title.toLowerCase().replace(/\s+/g, "-"));
}

/**
 * Converts an OpenAPI schema object into a TypeScript type string.
 *
 * Handles:
 * - References ($ref) by extracting the type name
 * - Nullable types by appending "| null"
 * - Composition types (allOf → intersection, oneOf/anyOf → union)
 * - Enums by creating union types of the values
 * - OneOf schemas as union types
 * - Basic types (string, number, boolean)
 * - Binary format strings as a union with file metadata object
 * - Arrays by recursively getting the item type
 * - Objects with properties by creating interfaces
 * - Objects with additionalProperties as Records
 * - Fallback to "any" for unknown types
 *
 * @param schema - The OpenAPI schema/parameter object to convert
 * @returns The TypeScript type as a string
 */
export function getTypeFromSchema(
	schema: OpenAPIV3.ParameterObject | OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | undefined
): string | undefined {
	if (!schema) return undefined;
	// Handle $ref by extracting the referenced type name
	if ("$ref" in schema) {
		const refType = schema.$ref.split("/").pop();
		return sanitizeTypeName(refType as string);
	}

	// Add "| null" for nullable types
	const nullable = "nullable" in schema && schema.nullable ? " | null" : "";

	// Handle allOf (intersection types)
	if ("allOf" in schema && schema.allOf) {
		const types = schema.allOf
			.map((s) => getTypeFromSchema(s))
			.filter(Boolean) as string[];
		if (types.length === 0) return "any";
		const result = types.length === 1 ? types[0] : `(${types.join(" & ")})`;
		return `${result}${nullable}`;
	}

	// Handle oneOf (union types - exactly one)
	if ("oneOf" in schema && schema.oneOf) {
		const types = schema.oneOf
			.map((s) => getTypeFromSchema(s))
			.filter(Boolean) as string[];
		if (types.length === 0) return "any";
		const result = types.length === 1 ? types[0] : `(${types.join(" | ")})`;
		return `${result}${nullable}`;
	}

	// Handle anyOf (union types - one or more)
	if ("anyOf" in schema && schema.anyOf) {
		const types = schema.anyOf
			.map((s) => getTypeFromSchema(s))
			.filter(Boolean) as string[];
		if (types.length === 0) return "any";
		const result = types.length === 1 ? types[0] : `(${types.join(" | ")})`;
		return `${result}${nullable}`;
	}

	// Handle enums as union types
	if ("enum" in schema && schema.enum) {
		if (Object.values(schema.enum)?.length > 0) {
			return (
				Object.values(schema.enum)
					.map((e) => (typeof e === "string" ? `'${e}'` : e))
					.join(" | ") + nullable
			);
		}
		return schema.enum.map((e) => (typeof e === "string" ? `'${e}'` : e)).join(" | ") + nullable;
	}

	// Handle oneOf as union types
	if ("oneOf" in schema && schema.oneOf) {
		const unionTypes = schema.oneOf
			.map((subSchema) => getTypeFromSchema(subSchema))
			.filter((type): type is string => type !== undefined);
		return unionTypes.length > 0 ? `${unionTypes.join(" | ")}${nullable}` : `any${nullable}`;
	}

	// Handle types based on the "type" property
	if ("type" in schema) {
		switch (schema.type) {
			case "string":
				// Special case for binary format strings
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
				// Recursively get the array item type
				const itemType = getTypeFromSchema(schema.items);
				return `Array<${itemType}>${nullable}`;
			}

			case "object":
				// Handle objects with defined properties
				if (schema.properties) {
					const properties = Object.entries(schema.properties)
						.map(([key, prop]) => {
							// @ts-ignore
							if (schema.required === false) {
								console.log(JSON.stringify(schema, null, 2));
							}
							const isRequired = schema.required?.includes(key);
							const propertyType = getTypeFromSchema(prop);
							const safeName = sanitizePropertyName(key);
							const isDeprecated = "deprecated" in prop && prop.deprecated;
							const hasDescription = "description" in prop && prop.description;
							const desc =
								hasDescription || isDeprecated
									? `/**${hasDescription ? `\n* ${prop.description}` : ""}${isDeprecated ? "\n* @deprecated" : ""}
									*/\n`
									: "";
							return `${desc}${safeName}${isRequired ? "" : "?"}: ${propertyType};`;
						})
						.join("\n");
					return `{${properties}\n}${nullable}`;
				}

				// Handle objects with additionalProperties
				if (schema.additionalProperties) {
					const valueType =
						typeof schema.additionalProperties === "boolean"
							? "any"
							: getTypeFromSchema(schema.additionalProperties);
					return `Record<string, ${valueType}>${nullable}`;
				}

				// Default object type when no properties specified
				return `Record<string, any>${nullable}`;

			default:
				return `any${nullable}`;
		}
	}

	// Fallback for schemas without a type
	return "any";
}
