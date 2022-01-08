import React, {FC} from 'react';
import NotFoundPage from 'src/components/pages/NotFoundPage';
import {useRoutes} from 'src/core/router';

import * as routes from './routes';
import {AppRoute} from './routes';

const allRoutes = Object.values(routes) as AppRoute<Record<string, string>, unknown>[];

const Router: FC = () => {
  const currentRoute = useRoutes(allRoutes);
  if (!currentRoute) return <NotFoundPage />;
  const {route, params, query} = currentRoute;
  return route.render(params, query);
};

export default Router;
