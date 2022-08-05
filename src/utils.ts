import lodash from 'lodash';
const { uniq, isEmpty } = lodash;
import pasCase from 'case';

const { pascal } = pasCase;

import { ReferenceObject, RequestBodyObject, ResponseObject, SchemaObject } from 'openapi3-ts';

export const getDocs = (data: ReferenceObject | { description?: string }) =>
  isReference(data) ? '' : formatDescription(data.description);
/**
 * Discriminator helper for `ReferenceObject`
 */
export const isReference = (property: any): property is ReferenceObject => {
  return Boolean(property.$ref);
};

/**
 * Return the typescript equivalent of open-api data type
 */
export const getScalar = (item: SchemaObject) => {
  const nullable = item.nullable ? ' | null' : '';

  switch (item.type) {
    case 'number':
    case 'integer':
      return 'number' + nullable;

    case 'boolean':
      return 'boolean' + nullable;

    case 'array':
      return getArray(item) + nullable;

    case 'string':
      return (item.enum ? `"${item.enum.join(`" | "`)}"` : 'string') + nullable;

    case 'object':
    default:
      return getObject(item) + nullable;
  }
};

/**
 * Return the output type from the $ref
 */
const getRef = ($ref: ReferenceObject['$ref']) => {
  if ($ref.startsWith('#/components/schemas')) {
    return pascal($ref.replace('#/components/schemas/', ''));
  } else if ($ref.startsWith('#/components/responses')) {
    return pascal($ref.replace('#/components/responses/', '')) + 'Response';
  } else if ($ref.startsWith('#/components/parameters')) {
    return pascal($ref.replace('#/components/parameters/', '')) + 'Parameter';
  } else if ($ref.startsWith('#/components/requestBodies')) {
    return pascal($ref.replace('#/components/requestBodies/', '')) + 'RequestBody';
  } else {
    throw new Error('This library only resolve $ref that are include into `#/components/*` for now');
  }
};

/**
 * Return the output type from an array
 */
const getArray = (item: SchemaObject): string => {
  if (item.items) {
    if (!isReference(item.items) && (item.items.oneOf || item.items.allOf || item.items.enum)) {
      return `(${resolveValue(item.items)})[]`;
    } else {
      return `${resolveValue(item.items)}[]`;
    }
  } else {
    throw new Error('All arrays must have an `items` key define');
  }
};

/**
 * Return the output type from an object
 */
const getObject = (item: SchemaObject): string => {
  if (isReference(item)) {
    return getRef(item.$ref);
  }

  if (item.allOf) {
    return item.allOf.map(resolveValue).join(' & ');
  }

  if (item.oneOf) {
    return item.oneOf.map(resolveValue).join(' | ');
  }

  if (!item.type && !item.properties && !item.additionalProperties) {
    return '{}';
  }

  // Free form object (https://swagger.io/docs/specification/data-models/data-types/#free-form)
  if (
    item.type === 'object' &&
    !item.properties &&
    (!item.additionalProperties || item.additionalProperties === true || isEmpty(item.additionalProperties))
  ) {
    return '{[key: string]: any}';
  }

  const IdentifierRegexp = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
  // Consolidation of item.properties & item.additionalProperties
  let output = '{\n';
  if (item.properties) {
    output += Object.entries(item.properties)
      .map(([key, prop]: [string, ReferenceObject | SchemaObject]) => {
        const doc = getDocs(prop);
        const isRequired = (item.required || []).includes(key);
        const processedKey = IdentifierRegexp.test(key) ? key : `"${key}"`;
        return `${doc}\n${processedKey}${isRequired ? '' : '?'}: ${resolveValue(prop)};`;
      })
      .join('');
  }

  if (item.additionalProperties) {
    if (item.properties) {
      output += '\n';
    }
    output += `} & { [key: string]: ${
      item.additionalProperties === true ? 'any' : resolveValue(item.additionalProperties)
    }`;
  }

  if (item.properties || item.additionalProperties) {
    if (output === '{\n') {
      return '{}';
    }
    return output + '\n}';
  }

  return item.type === 'object' ? '{[key: string]: any}' : 'any';
};

/**
 * Resolve the value of a schema object to a proper type definition.
 */
export const resolveValue = (schema: SchemaObject) =>
  isReference(schema) ? getRef(schema.$ref) : getScalar(schema);

/**
 * Format a description to code documentation.
 */
export const formatDescription = (description?: string) => {
  if (!description) {
    return '';
  }
  return `\n/**\n${description
    .split('\n')
    .map((i) => `*  ${i}`)
    .join('\n')}\n */`;
};

/**
 * Extract responses / request types from open-api specs
 */
export const getResReqTypes = (
  responsesOrRequests: Array<[string, ResponseObject | ReferenceObject | RequestBodyObject]>
) => {
  return uniq(
    responsesOrRequests.map(([_, res]) => {
      if (!res) {
        return;
      }

      if (isReference(res)) {
        return getRef(res.$ref);
      }

      if (res.content) {
        for (let contentType of Object.keys(res.content)) {
          if (
            contentType.startsWith('application/json') ||
            contentType.startsWith('application/octet-stream')
          ) {
            const schema = res.content[contentType].schema!;

            return resolveValue(schema);
          }
        }
        return;
      }

      return;
    })
  ).join(' | ');
};
