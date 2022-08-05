export const generateImports = ({
  schemaName,
  apiDirectory,
  queryClientDir,
  schemaImports,
  queryImports,
}: {
  apiDirectory: string;
  queryClientDir: string;
  schemaName: string;
  schemaImports: string[];
  queryImports: ('query' | 'mutation' | 'infiniteQuery')[];
}) => {
  const importTypes = schemaImports.join(',');
  let imports = [] as string[];
  if (queryImports.includes('query')) {
    imports = [...imports, 'useQuery', 'UseQueryOptions', 'QueryKey', 'SetDataOptions', 'QueryFilters'];
  }
  if (queryImports.includes('infiniteQuery')) {
    imports = [...imports, 'useInfiniteQuery', 'UseInfiniteQueryOptions', 'QueryKey'];
  }
  if (queryImports.includes('mutation')) {
    imports = [...imports, 'UseMutationOptions', 'useMutation'];
  }

  const importString = [...new Set(imports)].join(',');

  return `
  import {
    ${importString}
  } from '@tanstack/react-query';
  
  import { AxiosError } from 'axios';
  import { api } from '${apiDirectory}';
  import { queryClient } from '${queryClientDir}';

  import {${importTypes}} from './${schemaName}'

  type Updater<TInput, TOutput> = TOutput | ((input: TInput) => TOutput);  
  `;
};
