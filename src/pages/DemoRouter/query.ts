import {identity} from 'lodash-es';
import {
  iqgenForArray,
  iqgenForOptional,
  iqgenForRecord,
  iqgenForString,
  withPrefix,
} from 'src/core/router/queryable';

import {DemoSort, iqDemoSort} from './DemoSorter';

type Filters = {
  search: null | string;
  tags: string[];
};

const iqFilters = iqgenForRecord<Filters>({
  search: iqgenForString('search'),
  tags: iqgenForArray('tags', {toString: identity, fromString: identity}),
});

type SampleSortColumns = 'a' | 'b';
export type QueryPayload = {
  filters: Filters;
  sort?: null | DemoSort<SampleSortColumns>;
};
export const iqDemoRouterPage = iqgenForRecord<QueryPayload>({
  filters: iqFilters,
  sort: withPrefix('customPrefix', iqgenForOptional(iqDemoSort())),
});
