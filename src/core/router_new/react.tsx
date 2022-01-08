import {History, Location} from 'history';
import React, {FC, useContext, useLayoutEffect, useMemo} from 'react';

import {panic, useForceRender} from '../utils';
import {Href} from './core';

type RouterContext = {
  history: History;
};
const routerContext = React.createContext<null | RouterContext>(null);
const useRouterContext = (): RouterContext =>
  useContext(routerContext) || panic('No router context provided');

export const RouterProvider: FC<{history: History}> = ({history, children}) => (
  <routerContext.Provider value={{history}}>{children}</routerContext.Provider>
);

export const Link: FC<{href: Href} & React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  href,
  ...rest
}) => <a href={href} {...rest} />;
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
  const forceRender = useForceRender();
  useLayoutEffect(() => {
    const unlisten = history.listen(forceRender);
    return unlisten();
  }, []);
  return history.location;
};
