import {compact} from 'lodash-es';
import {Query, Queryable} from 'src/core/router/core';

import {DemoSort} from './DemoSorter';

type Filters = {
  search: string;
  tags: string[];
};

export type QueryPayload = {
  filters: Filters;
  sort: null | DemoSort<'a' | 'b'>;
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

const sort2query = <F extends string>(sort: null | DemoSort<F>): Query => ({
  sortBy: (sort && [`${sort.field};${sort.desc ? 'desc' : 'asc'}`]) || [],
});
const query2sort = <F extends string>(query: Query): null | DemoSort<F> => {
  if (!query.sortBy[0]) return null;
  const [field, order] = query.sortBy[0].split(';');
  return {field: field as F, desc: order === 'desc'};
};

const payload2query = (payload: QueryPayload): Query => {
  const {filters, sort} = payload;
  return {
    ...filters2query(filters),
    ...sort2query(sort),
  };
};
const query2payload = (query: Query): QueryPayload => {
  return {
    filters: query2filters(query),
    sort: query2sort(query),
  };
};

export const devDemoPageQueryableInstance: Queryable<QueryPayload> = {
  fromQuery: query2payload,
  toQuery: payload2query,
};
