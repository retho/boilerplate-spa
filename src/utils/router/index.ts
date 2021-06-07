import {useMemo} from 'react';
import {Route, Empty, Query} from './core';
import UrlPattern from 'url-pattern';
import {stringify as qsStringifyQuery, parse as qsParse} from 'query-string';
import {mapValues, isEmpty} from 'lodash-es';
// eslint-disable-next-line no-restricted-imports
import {
  matchPath,
  useHistory as useHistoryOrigin,
  Redirect,
  useLocation as useLocationOrigin,
} from 'react-router-dom';
import {History} from 'history';

const arrayFormat = 'bracket' as const;

export {Redirect};

export const stringifyQuery = qsStringifyQuery;
export const stringifyRoute = <P extends string | Empty, Q extends unknown>(
  route: Route<unknown, P, Q>,
  params: Record<P extends Empty ? never : P, string>,
  queryPayload: Q
): string => {
  const pattern = new UrlPattern(route.pattern);
  const query = route.queryableInstance.toQuery(queryPayload);
  return (
    pattern.stringify(params && mapValues(params, encodeURIComponent)) +
    (isEmpty(query)
      ? ''
      : `?${stringifyQuery(
          mapValues(query, x => (x && x.length === 1 ? x[0] || undefined : x)),
          {arrayFormat}
        )}`)
  );
};

export const matchRoute = <P extends string | Empty, Q>(
  route: Route<unknown, P, Q>,
  pathname: string,
  query: Query
): null | [Record<P, string>, Q] => {
  const matched: {params: Record<P, string>} | null = matchPath(pathname, {
    path: route.pattern,
    exact: true,
  });

  if (!matched) return null;

  const params = mapValues(matched.params, decodeURIComponent);
  const queryPayload = route.queryableInstance.fromQuery(query);

  return [params, queryPayload];
};

export const parseQuery = (search: string): Query => {
  const query = mapValues(
    qsParse(search, {
      parseBooleans: false,
      parseNumbers: false,
      arrayFormat,
    }),
    x => (Array.isArray(x) ? x : (x && [x]) || []).map(decodeURIComponent)
  );

  const proxy = new Proxy(query, {
    get: (target, name) => target[name as string] || [],
  });

  return proxy;
};

export const useHistory = (): History<unknown> => {
  const history = useHistoryOrigin();
  return useMemo(() => {
    return {
      ...history,
      push: (path: string) => history.push(encodeURI(path)),
      replace: (path: string) => history.replace(encodeURI(path)),
    };
  }, []);
};

export const useLocation = (): Location => {
  useLocationOrigin();
  // eslint-disable-next-line no-restricted-properties
  return window.location;
};
