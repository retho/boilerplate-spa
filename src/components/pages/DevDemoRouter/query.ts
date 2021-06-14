import {compact} from 'lodash';
import {Query, Queryable} from 'utils/router/core';

type Filters = {
  search: string;
  tags: string[];
};
type Sort<F extends string> = {
  field: F;
  desc: boolean;
};
export type QueryPayload = {
  filters: Filters;
  sorts: Sort<'a' | 'b'>[];
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

const sorts2query = <F extends string>(sorts: Sort<F>[]): Query => {
  return {
    sortBy: sorts.map(({field, desc}) => `${field};${desc ? 'desc' : 'asc'}`),
  };
};
const query2sorts = <F extends string>(query: Query): Sort<F>[] => {
  return compact(query.sortBy).map(x => {
    const [field, order] = x.split(';');
    return {field: field as F, desc: order === 'desc'};
  });
};

const payload2query = (payload: QueryPayload): Query => {
  const {filters, sorts} = payload;
  return {
    ...filters2query(filters),
    ...sorts2query(sorts),
  };
};
const query2payload = (query: Query): QueryPayload => {
  return {
    filters: query2filters(query),
    sorts: query2sorts(query),
  };
};

export const devDemoPageQueryableInstance: Queryable<QueryPayload> = {
  fromQuery: query2payload,
  toQuery: payload2query,
};
