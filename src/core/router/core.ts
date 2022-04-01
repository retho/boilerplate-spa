import {isEmpty, mapValues} from 'lodash-es';
import {parse as qsParse, stringify as qsStringifyQuery} from 'query-string';
import {Brand} from 'src/core/utils';
import UrlPattern from 'url-pattern';

export type RawQuery = Record<string, [undefined] | string[]>;

const PUBLIC_URL = process.env.PUBLIC_URL || '';

export type Queryable<T extends unknown> = {
  toQuery: (payload: T) => RawQuery;
  fromQuery: (query: RawQuery) => T;
};
export const emptyQueryableInstance: Queryable<Record<string, never>> = {
  fromQuery: () => ({}),
  toQuery: () => ({}),
};

export type Paramable<T extends unknown> = {
  __dummyParams: T;
};
export const declareRouteParams = <T = Record<string, never>>(): Paramable<T> => ({
  __dummyParams: (null as unknown) as T,
});

export type Route<Params, Query> = {
  pattern: string;
  query: Queryable<Query>;
  params: Paramable<Params>;
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

export const matchRoute = <Params, Query>(
  route: Route<Params, Query>,
  pathname: string,
  search: string
): null | {params: Params; query: Query} => {
  const urlPattern = new UrlPattern(PUBLIC_URL + route.pattern);
  const matched: null | Record<string, string> = urlPattern.match(pathname);

  if (!matched) return null;

  const rawParams = mapValues(matched, decodeURIComponent);
  const params = (rawParams as unknown) as Params;
  const query = route.query.fromQuery(parseQuery(search));

  return {params, query};
};

export const stringifyRoute = <Params, Query>(
  route: Route<Params, Query>,
  params: Params,
  query: Query
): Href => {
  const pattern = new UrlPattern(PUBLIC_URL + route.pattern);
  const rawQuery = route.query.toQuery(query);
  const rawParams =
    params && typeof params === 'object' ? ((params as unknown) as Record<string, string>) : null;
  return (pattern.stringify(rawParams && mapValues(rawParams, encodeURIComponent)) +
    (isEmpty(query) ? '' : stringifyQuery(rawQuery))) as Href;
};
