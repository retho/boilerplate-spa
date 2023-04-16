import {identity} from 'lodash-es';
import {ExtractQueryable} from 'src/core/router/core';
import {iqgenForArray, iqgenForRecord, iqgenForString, withPrefix} from 'src/core/router/queryable';

import {iqDemoSort} from './DemoSorter';

const iqFilters = iqgenForRecord({
  search: iqgenForString('search'),
  tags: iqgenForArray('tags', {toString: identity, fromString: identity}),
});

type SampleSortColumns = 'a' | 'b';
export const iqDemoRouterPage = iqgenForRecord({
  filters: iqFilters,
  sort: withPrefix('customPrefix', iqDemoSort<SampleSortColumns>()),
});
export type QueryDemoRouterPage = ExtractQueryable<typeof iqDemoRouterPage>;
