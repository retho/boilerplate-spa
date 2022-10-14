import {History, Location} from 'history';
import React, {FC, useContext, useLayoutEffect, useMemo, useRef} from 'react';

import {panic, useForceRender} from '../utils';
import {Href, matchRoute, Route} from './core';

type RouterContext = {
  history: History;
};
const routerContext = React.createContext<null | RouterContext>(null);
const useRouterContext = (): RouterContext =>
  useContext(routerContext) || panic('No router context provided');

export const RouterProvider: FC<{history: History}> = ({history, children}) => {
  const forceRender = useForceRender();

  const unlisten = useRef<() => void>();
  if (!unlisten.current) {
    unlisten.current = history.listen(forceRender);
  }
  useLayoutEffect(() => {
    return unlisten.current;
  }, []);

  return <routerContext.Provider value={{history}}>{children}</routerContext.Provider>;
};

export const Redirect: FC<{to: Href}> = ({to}) => {
  const {history} = useRouterContext();
  useLayoutEffect(() => {
    history.replace(to);
  }, []);
  return null;
};

type UsedHistory = {
  push: (path: Href) => void;
  replace: (path: Href) => void;
};
export const useHistory = (): UsedHistory => {
  const {history} = useRouterContext();
  return useMemo(() => {
    return {
      push: (path: Href) => history.push(encodeURI(path)),
      replace: (path: Href) => history.replace(encodeURI(path)),
    };
  }, []);
};

export const useLocation = (): Location => {
  const {history} = useRouterContext();
  return history.location;
};

export const useRoutes = <R extends Route<unknown, unknown>>(
  routes: R[]
): null | {route: R; params: unknown; query: unknown} => {
  const location = useLocation();

  return useMemo(() => {
    for (const r of routes) {
      const route = r;
      const matched = matchRoute(route, location.pathname, location.search);
      if (matched) {
        const {params, query} = matched;
        return {route, params, query};
      }
    }
    return null;
  }, [routes, location.pathname, location.search]);
};
