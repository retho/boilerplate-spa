import {compact} from 'lodash';
import {Query, Queryable} from 'utils/router/core';

type Filters = {
  search: string;
  tags: string[];
};
type Sort = {
  field: string;
  order: 'asc' | 'desc';
};
export type QueryPayload = {
  filters: Filters;
  sorts: Sort[];
};

type QFilters = 'search' | 'tags';
const filters2query = (filters: Filters): Query<QFilters> => {
  return {
    search: [filters.search],
    tags: filters.tags,
  };
};
const query2filters = (query: Query<QFilters>): Filters => {
  return {
    search: query.search[0] || '',
    tags: compact(query.tags),
  };
};

type QSorts = 'sortBy';
const sorts2query = (sorts: Sort[]): Query<QSorts> => {
  return {
    sortBy: sorts.map(({field, order}) => `${field};${order}`),
  };
};
const query2sorts = (query: Query<QSorts>): Sort[] => {
  return compact(query.sortBy).map(x => {
    const [field, order] = x.split(';');
    return {field, order: order as 'asc' | 'desc'};
  });
};

type QPayload = QFilters | QSorts;
const payload2query = (payload: QueryPayload): Query<QPayload> => {
  const {filters, sorts} = payload;
  return {
    ...filters2query(filters),
    ...sorts2query(sorts),
  };
};
const query2payload = (query: Query<QPayload>): QueryPayload => {
  return {
    filters: query2filters(query),
    sorts: query2sorts(query),
  };
};

export const devDemoPageQueryableInstance: Queryable<QPayload, QueryPayload> = {
  fromQuery: query2payload,
  toQuery: payload2query,
};
