import React, {FC} from 'react';
// eslint-disable-next-line no-restricted-imports
import {matchRoute, parseQuery, useLocation} from 'utils/router';
import NotFoundPage from 'components/pages/NotFoundPage';
import * as routes from './routes';
import {AppRoute} from './routes';
import {Empty, Query} from 'utils/router/core';

const findCurrentRoute = (pathname: string, query: Query<string | Empty>) => {
  for (const r of Object.values(routes)) {
    const route = r as AppRoute<string | Empty, unknown>;
    const matched = matchRoute(route, pathname, query);
    if (matched) {
      const [params, queryPayload] = matched;
      return route.render(params, queryPayload);
    }
  }
  return null;
};

const useCurrentRoute = () => {
  const location = useLocation();

  const query = parseQuery(location.search);
  const currentRoute = findCurrentRoute(location.pathname, query);

  return currentRoute || <NotFoundPage />;
};

const Router: FC = () => {
  const jsx = useCurrentRoute();
  return jsx;
};

export default Router;
