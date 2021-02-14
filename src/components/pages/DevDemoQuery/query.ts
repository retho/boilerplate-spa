import {Query, Queryable} from 'utils/router/core';

type Filters = {
  search: string;
};
export type QueryPayload = {
  filters: Filters;
};

type QFilters = 'search';
const filters2query = (filters: Filters): Query<QFilters> => {
  return {
    search: [filters.search],
  };
};
const query2filters = (query: Query<QFilters>): Filters => {
  return {
    search: query.search[0] || '',
  };
};

type QPayload = QFilters;
const payload2query = (payload: QueryPayload): Query<QPayload> => {
  const {filters} = payload;
  return {
    ...filters2query(filters),
  };
};
const query2payload = (query: Query<QPayload>): QueryPayload => {
  return {
    filters: query2filters(query),
  };
};

export const devDemoPageQueryableInstance: Queryable<QFilters, QueryPayload> = {
  fromQuery: query2payload,
  toQuery: payload2query,
};
