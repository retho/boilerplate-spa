import React, {FC} from 'react';
import {useRoutes} from 'src/core/router';
import NotFoundPage from 'src/pages/NotFoundPage';

import * as routes from './routes';
import {AppRoute} from './routes';

const allRoutes = Object.values(routes) as AppRoute<unknown, unknown>[];

const Router: FC = () => {
  const currentRoute = useRoutes(allRoutes);
  if (!currentRoute) return <NotFoundPage />;
  const {route, params, query} = currentRoute;
  return route.render(params, query);
};

export default Router;
