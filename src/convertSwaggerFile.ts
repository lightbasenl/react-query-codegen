import { OpenAPIObject } from 'openapi3-ts';
import swagger2openapi from 'swagger2openapi';
import yaml from 'js-yaml';

/**
 * Import and parse the openapi spec from a yaml/json
 */
export const convertSwaggerFile = (data: string, extension: 'yaml' | 'json'): Promise<OpenAPIObject> => {
  const schema = extension === 'yaml' ? yaml.load(data) : JSON.parse(data);
  return new Promise((resolve, reject) => {
    if (!schema.openapi || !schema.openapi.startsWith('3.')) {
      swagger2openapi.convertObj(schema, {}, (err, convertedObj) => {
        if (err) {
          reject(err);
        } else {
          // @ts-ignore
          convertedObj.openapi.basePath = convertedObj.original.basePath;
          resolve(convertedObj.openapi);
        }
      });
    } else {
      resolve(schema);
    }
  });
};
