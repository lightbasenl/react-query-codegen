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
	return name.replace(/[^a-zA-Z0-9_]/g, "_").replace(/_+$/, "");
}

export function specTitle(spec: OpenAPIV3.Document): string {
	return camelCase(spec.info.title.toLowerCase().replace(/\s+/g, "-"));
}
