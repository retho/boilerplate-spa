import {compact} from 'lodash-es';
import {Query, Queryable} from 'src/core/router_old/core';

import {DemoSort} from './DemoSorter';
import {queryableIstanceDemoSort} from './utils';

type Filters = {
  search: string;
  tags: string[];
};

type SampleSortColumns = 'a' | 'b';
export type QueryPayload = {
  filters: Filters;
  sort: null | DemoSort<SampleSortColumns>;
};

const filters2query = (filters: Filters): Query => {
  return {
    search: [filters.search],
    tags: filters.tags,
  };
};
const query2filters = (query: Query): Filters => {
  return {
    search: query.search[0] || '',
    tags: compact(query.tags),
  };
};

const sampleSortPrefix = 'samplePrefix';
const payload2query = (payload: QueryPayload): Query => {
  const {filters, sort} = payload;
  return {
    ...filters2query(filters),
    ...queryableIstanceDemoSort(sampleSortPrefix).toQuery(sort),
  };
};
const query2payload = (query: Query): QueryPayload => {
  return {
    filters: query2filters(query),
    sort: queryableIstanceDemoSort<SampleSortColumns>(sampleSortPrefix).fromQuery(query),
  };
};

export const demoRouterPageQueryableInstance: Queryable<QueryPayload> = {
  fromQuery: queryRaw => {
    const queryPayload = query2payload(queryRaw);
    // eslint-disable-next-line no-console
    console.log('fromQuery:', queryRaw, '=>', queryPayload);
    return queryPayload;
  },
  toQuery: queryPayload => {
    const queryRaw = payload2query(queryPayload);
    // eslint-disable-next-line no-console
    console.log('toQuery:', queryPayload, '=>', queryRaw);
    return queryRaw;
  },
};
