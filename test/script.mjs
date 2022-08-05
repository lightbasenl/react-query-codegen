import { importSpecs } from '../lib/commonjs/importSpecs';

importSpecs({
  sourceDirectory: 'test/specs',
  exportDirectory: 'test/generated',
  apiDirectory: '../../api',
  queryClientDir: '../../api',
  headerFilters: [],
  overrides: {
    GetTimeline: {
      type: 'infiniteQuery',
      infiniteQueryParm: 'Offset',
    },
  },
});
