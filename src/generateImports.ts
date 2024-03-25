export const generateImports = ({
  schemaName,
  apiDirectory,
  schemaImports,
  queryImports,
}: {
  apiDirectory: string;
  schemaName: string;
  schemaImports: string[];
  queryImports: ('query' | 'mutation' | 'infiniteQuery')[];
}) => {
  const importTypes = schemaImports.join(',');
  let imports = [] as string[];
  if (queryImports.includes('query')) {
    imports = [...imports, 'queryOptions'];
  }
  if (queryImports.includes('infiniteQuery')) {
    imports = [...imports, 'infiniteQueryOptions'];
  }

  const importString = [...new Set(imports)].join(',');

  return `
  import {
    ${importString}
  } from '@tanstack/react-query';
  
  import { api } from '${apiDirectory}';
  import {${importTypes}} from './${schemaName}'

  `;
};
