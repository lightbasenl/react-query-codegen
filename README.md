# React Query Code Generation

Generate fully typed react query hooks from OpenAPI specifications.

- GET requests will automatically generate `useQuery` hooks together with helper functions
  - getQueryState
  - getQueryData
  - prefetch
  - cancelQueries
  - invalidate
  - refetchStale

- Override default generation forcing query, mutation or infiniteQuery output

## Installation

You can install react-query-lightbase-codegen with NPM or Yarn.

Using NPM:

```bash
$ npm i -D react-query-lightbase-codegen 
```

Using Yarn:

```
$ yarn add -D react-query-lightbase-codegen
```

## Configuration

create a generateQueries.mjs file in project root folder

```javascript
// generateQueries.mjs
import { importSpecs } from 'react-query-lightbase-codegen';

importSpecs({
  // folder location of the openapi/swagger documents (yaml or JSON)
  sourceDirectory: './specs',
  // export folder for hooks and schema code generated files
  exportDirectory: './src/generated',
  // api client - as named export labelled 'api'
  apiDirectory: './src/api',
  // React query client directory - names export 'queryClient'
  queryClientDir: './src/api',
});
```

## Code generation

To generate the code generated scheme and react query hooks run the above script

```bash
node scripts/generateQueries.mjs && prettier --check ./src/generated/*.tsx --write
```

## Configuration Options

```javascript
// generateQueries.mjs
import { importSpecs } from 'react-query-lightbase-codegen';

importSpecs({
  ...
  // Filter out any headers from individual queries (these might be applied globally in the axios instance)
  headerFilters: ['X-Session-Token'],
  overrides: {
    // operationId listed in the openApi spec
    findPetsByStatus: {
      // Override the default query code generation type ('query' | 'mutation' | 'infiniteQuery')
      type: 'query',
    },
  },
});
```
