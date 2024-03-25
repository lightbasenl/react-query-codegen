import { importSpecs } from '../dist/importSpecs.js';

importSpecs({
  sourceDirectory: 'test/specs-private',
  exportDirectory: 'test/generated',
  apiDirectory: '../../api',
  queryClientDir: '../../queryClient',
  headerFilters: ['X-Parse-Session-Token', 'X-Golf-Platform', 'X-JWT-Assertion'],
});
