import {isEmpty, mapValues} from 'lodash-es';
import {parse as qsParse, stringify as qsStringifyQuery} from 'query-string';
import {Brand} from 'src/core/utils';
import UrlPattern from 'url-pattern';

export type RawQuery = Record<string, undefined | string[]>;

const PUBLIC_URL = process.env.PUBLIC_URL || '';

export type Queryable<T> = {
  toQuery: (payload: T) => RawQuery;
  fromQuery: (query: RawQuery) => T;
};
export const emptyQueryableInstance: Queryable<Record<string, never>> = {
  fromQuery: () => ({}),
  toQuery: () => ({}),
};

export type Paramable<T> = {
  $type_of_params: T;
};
export const declareRouteParams = <
  T extends Record<string, string> = Record<string, never>
>(): Paramable<T> => ({
  $type_of_params: (null as unknown) as T,
});

export type Route<Params, Query> = {
  pattern: string;
  query: Queryable<Query>;
  params: Paramable<Params>;
};

export type Href = Brand<'Href', string>;

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

export const matchRoute = <ParamsPayload, QueryPayload>(
  route: Route<ParamsPayload, QueryPayload>,
  pathname: string,
  search: string
): null | {params: ParamsPayload; query: QueryPayload} => {
  const urlPattern = new UrlPattern(PUBLIC_URL + route.pattern);
  const matched: null | Record<string, string> = urlPattern.match(pathname);

  if (!matched) return null;

  const rawParams = mapValues(matched, decodeURIComponent);
  const params = (rawParams as unknown) as ParamsPayload;
  const query = route.query.fromQuery(parseQuery(search));

  return {params, query};
};

export const stringifyRoute = <ParamsPayload, QueryPayload>(
  route: Route<ParamsPayload, QueryPayload>,
  params: ParamsPayload,
  query: QueryPayload
): Href => {
  const pattern = new UrlPattern(PUBLIC_URL + route.pattern);
  const rawQuery = route.query.toQuery(query);
  const rawParams =
    params && typeof params === 'object' ? ((params as unknown) as Record<string, string>) : null;
  return (pattern.stringify(rawParams && mapValues(rawParams, encodeURIComponent)) +
    (isEmpty(query) ? '' : stringifyQuery(rawQuery))) as Href;
};
