import React, {FC} from 'react';
import NotFoundPage from 'src/components/pages/NotFoundPage';
// eslint-disable-next-line no-restricted-imports
import {matchRoute, parseQuery, useLocation} from 'src/core/router';
import {Query} from 'src/core/router/core';

import * as routes from './routes';
import {AppRoute} from './routes';

const findCurrentRoute = (pathname: string, query: Query) => {
  for (const r of Object.values(routes)) {
    const route = r as AppRoute<Record<string, string>, unknown>;
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
