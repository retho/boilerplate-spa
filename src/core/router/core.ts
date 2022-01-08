import {isEmpty, mapValues} from 'lodash-es';
import {parse as qsParse, stringify as qsStringifyQuery} from 'query-string';
import {Brand} from 'src/core/utils';
import UrlPattern from 'url-pattern';

export type RawQuery = Record<string, [undefined] | string[]>;

export type Queryable<T extends unknown> = {
  toQuery: (payload: T) => RawQuery;
  fromQuery: (query: RawQuery) => T;
};
export const emptyQueryableInstance: Queryable<Record<string, never>> = {
  fromQuery: () => ({}),
  toQuery: () => ({}),
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Route<Params extends Record<string, string>, Query> = {
  pattern: string;
  queryableInstance: Queryable<Query>;
};

declare const hrefbrand: unique symbol;
export type Href = Brand<typeof hrefbrand, string>;

const qsArrayFormat = 'none';
const parseQuery = (search: string): RawQuery => {
  const query = mapValues(
    qsParse(search, {
      parseBooleans: false,
      parseNumbers: false,
      arrayFormat: qsArrayFormat,
    }),
    x => (Array.isArray(x) ? x : (x && [x]) || []).map(decodeURIComponent)
  );

  const proxy = new Proxy(query, {
    get: (target, name) => target[name as string] || [],
  });

  return proxy;
};
const stringifyQuery = (rawQuery: RawQuery) =>
  isEmpty(rawQuery)
    ? ''
    : `?${qsStringifyQuery(
        mapValues(rawQuery, x => (x && x.length === 1 ? x[0] || undefined : x)),
        {arrayFormat: qsArrayFormat}
      )}`;

export const matchRoute = <Params extends Record<string, string>, Query>(
  route: Route<Params, Query>,
  pathname: string,
  search: string
): null | {params: Params; query: Query} => {
  const urlPattern = new UrlPattern(route.pattern);
  const matched: null | Params = urlPattern.match(pathname);

  if (!matched) return null;

  const params = mapValues(matched, decodeURIComponent) as Params;
  const query = route.queryableInstance.fromQuery(parseQuery(search));

  return {params, query};
};

export const stringifyRoute = <Params extends Record<string, string>, Query extends unknown>(
  route: Route<Params, Query>,
  params: Params,
  query: Query
): Href => {
  const pattern = new UrlPattern(route.pattern);
  const rawQuery = route.queryableInstance.toQuery(query);
  return (pattern.stringify(params && mapValues(params, encodeURIComponent)) +
    (isEmpty(query) ? '' : stringifyQuery(rawQuery))) as Href;
};
