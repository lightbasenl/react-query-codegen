import pasCase from 'case';
import lodash from 'lodash';
const { isEmpty } = lodash;
const { pascal } = pasCase;
import { ComponentsObject, OpenAPIObject, SchemaObject } from 'openapi3-ts';
import { formatDescription, getScalar, isReference, resolveValue } from './utils.js';

import { getDocs, getResReqTypes } from './utils.js';

/**
 * Generate the interface string
 */
const generateInterface = (name: string, schema: SchemaObject) => {
  const scalar = getScalar(schema);
  return `${formatDescription(schema.description)}
       export type ${pascal(name)} = ${scalar}
     `;
};

/**
 * Extract all types from #/components/schemas
 */
const generateSchemasDefinition = (schemas: ComponentsObject['schemas'] = {}) => {
  if (isEmpty(schemas)) {
    return '';
  }

  return (
    '\n // SCEHMAS \n' +
    Object.entries(schemas)
      .map(([name, schema]) =>
        !isReference(schema) &&
        (!schema.type || schema.type === 'object') &&
        !schema.allOf &&
        !schema.oneOf &&
        !isReference(schema) &&
        !schema.nullable
          ? generateInterface(name, schema)
          : `${formatDescription(isReference(schema) ? undefined : schema.description)} export type ${pascal(
              name
            )} = ${resolveValue(schema)};`
      )
      .join('\n\n') +
    '\n'
  );
};

/**
 * Extract all types from #/components/requestBodies
 */
const generateRequestBodiesDefinition = (requestBodies: ComponentsObject['requestBodies'] = {}) => {
  if (isEmpty(requestBodies)) {
    return '';
  }

  return (
    '\n // REQUEST BODIES \n' +
    Object.entries(requestBodies)
      .map(([name, requestBody]) => {
        const doc = getDocs(requestBody);
        const type = getResReqTypes([['', requestBody]]);
        const isEmptyInterface = type === '{}';
        if (isEmptyInterface) {
          return `${doc}\nexport type ${pascal(name)}RequestBody = ${type}`;
        } else if (type.includes('{') && !type.includes('|') && !type.includes('&')) {
          return `${doc}\nexport type ${pascal(name)}RequestBody = ${type}`;
        } else {
          return `${doc}\nexport type ${pascal(name)}RequestBody = ${type};`;
        }
      })
      .join('\n\n') +
    '\n'
  );
};

/**
 * Extract all types from #/components/responses
 */
const generateResponsesDefinition = (responses: ComponentsObject['responses'] = {}) => {
  if (isEmpty(responses)) {
    return '';
  }

  return (
    '\n // RESPONSES \n' +
    Object.entries(responses)
      .map(([name, response]) => {
        const doc = getDocs(response);
        const type = getResReqTypes([['', response]]);
        const isEmptyInterface = type === '{}';
        if (isEmptyInterface) {
          return `export type RQ${pascal(name)}Response = ${type}`;
        } else if (type.includes('{') && !type.includes('|') && !type.includes('&')) {
          return `${doc}export type RQ${pascal(name)}Response = ${type}`;
        } else {
          return `${doc}export type RQ${pascal(name)}Response = ${type};`;
        }
      })
      .join('\n\n') +
    '\n'
  );
};

/**
 * Extract all types from #/components/schemas
 */
export const generateSchemas = ({ spec }: { spec: OpenAPIObject }) => {
  const schemaOutput =
    generateRequestBodiesDefinition(spec.components?.requestBodies) +
    generateResponsesDefinition(spec.components?.responses) +
    generateSchemasDefinition(spec.components?.schemas);

  return schemaOutput;
};
