import {isEmpty, mapValues} from 'lodash-es';
import {parse as qsParse, stringify as qsStringifyQuery} from 'query-string';
import React, {FC, useMemo} from 'react';
// eslint-disable-next-line no-restricted-imports
import {
  matchPath,
  Redirect as RedirectOrigin,
  useHistory as useHistoryOrigin,
  useLocation as useLocationOrigin,
} from 'react-router-dom';
import {Brand} from 'src/core/utils';
import UrlPattern from 'url-pattern';

import {Query, Route} from './core';

const uribrand = Symbol('Uri');
export type Uri = Brand<typeof uribrand, string>;

export const Redirect: FC<{to: Uri}> = ({to}) => <RedirectOrigin to={to} />;

const array_format = 'bracket' as const;

export const stringifyQuery = qsStringifyQuery;
export const stringifyRoute = <P extends Record<string, string>, Q extends unknown>(
  route: Route<unknown, P, Q>,
  params: P,
  queryPayload: Q
): Uri => {
  const pattern = new UrlPattern(route.pattern);
  const query = route.queryableInstance.toQuery(queryPayload);
  return (pattern.stringify(params && mapValues(params, encodeURIComponent)) +
    (isEmpty(query)
      ? ''
      : `?${stringifyQuery(
          mapValues(query, x => (x && x.length === 1 ? x[0] || undefined : x)),
          {arrayFormat: array_format}
        )}`)) as Uri;
};

export const matchRoute = <P extends Record<string, string>, Q>(
  route: Route<unknown, P, Q>,
  pathname: string,
  query: Query
): null | [P, Q] => {
  const matched: {params: P} | null = matchPath(pathname, {
    path: route.pattern,
    exact: true,
  });

  if (!matched) return null;

  const params = mapValues(matched.params, decodeURIComponent);
  const queryPayload = route.queryableInstance.fromQuery(query);

  return [params as P, queryPayload];
};

export const parseQuery = (search: string): Query => {
  const query = mapValues(
    qsParse(search, {
      parseBooleans: false,
      parseNumbers: false,
      arrayFormat: array_format,
    }),
    x => (Array.isArray(x) ? x : (x && [x]) || []).map(decodeURIComponent)
  );

  const proxy = new Proxy(query, {
    get: (target, name) => target[name as string] || [],
  });

  return proxy;
};

type History = {
  push: (path: Uri) => void;
  replace: (path: Uri) => void;
};
export const useHistory = (): History => {
  const history = useHistoryOrigin();
  return useMemo(() => {
    return {
      push: (path: Uri) => history.push(encodeURI(path)),
      replace: (path: Uri) => history.replace(encodeURI(path)),
    };
  }, []);
};

export const useLocation = (): Location => {
  useLocationOrigin();
  // eslint-disable-next-line no-restricted-properties
  return window.location;
};
