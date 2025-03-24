# react-query-lightbase-codegen

Generate type-safe Axios API clients and React Query hooks from OpenAPI specifications.

## Features

- 🔄 Automatic code generation from OpenAPI/Swagger specs
- 📝 Type-safe API client functions
- 🎣 React Query integration with query options
- 📦 Support for multiple API specifications
- 📤 Handle multipart/form-data uploads
- 💪 Full TypeScript support
- 🔒 Type-safe request/response handling

## Installation

```bash
npm install react-query-lightbase-codegen
```

## Quick Start

### 1. Configure Generation

Create a script to generate your API code (e.g., `scripts/generate.ts`):

```typescript
import { codegenerate } from 'react-query-lightbase-codegen';
await codegenerate({
  specSource: './specs/api.yaml', // or array of specs
  exportDir: './src/generated'
});
```

### 2. Configure API Instance

```typescript
import axios from "axios";
import { setApiClient } from "./src/generated/apiClient";

const api = axios.create({ baseURL: "https://api.example.com" });
// Set the API client instance to be used by the generated client functions
setApiClient(api);

```

### 3. Use Generated Query Options

```typescript
import { useQuery } from '@tanstack/react-query';
import { characteristicListQueryOptions } from './src/generated/pokiApi.queryOptions';

const { data, isLoading, error } = useQuery(characteristicListQueryOptions());
```

and more complex queries: 
```typescript
import { useQuery } from '@tanstack/react-query';
import { characteristicListQueryOptions } from './src/generated/pokiApi.queryOptions';

const { data, isLoading, error } = useQuery({
  ...characteristicListQueryOptions(),
  select: (data) => data.results.find(item => item.id === itemId),
});
```

easier query invalidation:
```typescript
queryClient.invalidateQueries(characteristicListQueryOptions());
```


## Generated Files

A single `apiClient.ts` file is generated to be used as a global Axios instance for all generated clients.

For each API specification, the following files are generated:

- `{api}.schema.ts` - TypeScript types for requests/responses
- `{api}.client.ts` - Type-safe API client functions
- `{api}.queryOptions.ts` - React Query integration

### Multiple API Specifications

```typescript
await codegenerate({
specSource: [
  './specs/auth-api.yaml',
  './specs/user-api.json',
  'https://api.example.com/openapi.yaml'
],
exportDir: './src/generated'
});
```