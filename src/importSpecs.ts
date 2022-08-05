import chalk from 'chalk';
import { readFileSync, writeFileSync, readdir, mkdirSync } from 'fs';
import { OperationObject, PathItemObject } from 'openapi3-ts';
import { join, parse } from 'path';
import { convertSwaggerFile } from './convertSwaggerFile.js';
import { createHook } from './generateHooks.js';
import { generateImports } from './generateImports.js';
import { generateSchemas } from './generateSchemas.js';

export function importSpecs({
  sourceDirectory,
  exportDirectory,
  apiDirectory,
  queryClientDir,
  headerFilters,
  overrides,
}: {
  sourceDirectory: string;
  exportDirectory: string;
  apiDirectory: string;
  queryClientDir: string;
  headerFilters?: string[];
  overrides?: Record<
    string,
    { type: 'query' } | { type: 'mutation' } | { type: 'infiniteQuery'; infiniteQueryParm: string }
  >;
}) {
  readdir(sourceDirectory, function (err, filenames) {
    if (err) {
      console.log(err);
      throw err;
    }
    filenames.map(async (filename) => {
      try {
        const data = readFileSync(join(process.cwd(), sourceDirectory + '/' + filename), 'utf-8');
        const { ext } = parse(sourceDirectory + '/' + filename);
        const format = ['.yaml', '.yml'].includes(ext.toLowerCase()) ? 'yaml' : 'json';
        let spec = await convertSwaggerFile(data, format);

        const schemaName = `useQueries${filename.split('.')[0]}.schema`;
        const hooksName = `useQueries${filename.split('.')[0]}`;
        const name = filename.split('.')[0];
        mkdirSync(join(process.cwd(), `${exportDirectory}/${name}`), { recursive: true });

        const operationIds: string[] = [];

        let hooks = '';
        let schemaImportsArray = [] as string[];
        let collectedQueryImports = [] as ('query' | 'mutation' | 'infiniteQuery')[];
        Object.entries(spec.paths).forEach(([route, verbs]: [string, PathItemObject]) => {
          Object.entries(verbs).forEach(([verb, operation]: [string, OperationObject]) => {
            if (['get', 'post', 'patch', 'put', 'delete'].includes(verb) && !operation.deprecated) {
              const { implementation, imports, queryImports } = createHook({
                operation,
                verb,
                route: (spec.basePath || '') + route,
                operationIds,
                parameters: verbs.parameters,
                schemasComponents: spec.components,
                headerFilters,
                overrides,
              });

              hooks += implementation;
              imports.forEach((element) => {
                const formattedImport = element.replace('[]', '');
                if (
                  !schemaImportsArray.includes(formattedImport) &&
                  element !== 'void' &&
                  element !== 'string' &&
                  !element.includes('{')
                ) {
                  schemaImportsArray.push(formattedImport);
                }
              });
              queryImports.forEach((element) => {
                if (!schemaImportsArray.includes(element)) {
                  collectedQueryImports.push(element);
                }
              });
            }
          });
        });

        const imports = generateImports({
          apiDirectory,
          queryClientDir,
          schemaName,
          schemaImports: schemaImportsArray,
          queryImports: collectedQueryImports,
        });

        writeFileSync(join(process.cwd(), `${exportDirectory}/${name}/${hooksName}.tsx`), imports + hooks);

        const schemas = generateSchemas({ spec });
        writeFileSync(join(process.cwd(), `${exportDirectory}/${name}/${schemaName}.tsx`), schemas);

        console.log(
          chalk.green(`🎉 [${filename}] Your OpenAPI spec has been converted into react query hooks`)
        );
      } catch (error) {
        if ((error as any).code === 'EISDIR') {
          console.log(chalk.red('nested folder structure not supported'));
          return;
        }
        console.log(chalk.red(`[${filename}]:`), chalk.red(error));
      }
    });
  });
}
