import React, {FC, useLayoutEffect} from 'react';
import {useAppDispatch} from 'src/core/redux';
import {addUnauthorizedEventListener, removeUnauthorizedEventListener} from 'src/core/request';
import {useRoutes} from 'src/core/router';
import NotFoundPage from 'src/pages/NotFoundPage';
import {logoutForce} from 'src/store/slices/auth';

import * as routes from './routes';
import {AppRoute} from './routes';

const allRoutes = Object.values(routes) as AppRoute<unknown, unknown>[];

const useForceLoagout = () => {
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    const cb = () => dispatch(logoutForce());
    addUnauthorizedEventListener(cb);
    return () => removeUnauthorizedEventListener(cb);
  }, []);
};

const Router: FC = () => {
  useForceLoagout();
  const currentRoute = useRoutes(allRoutes);
  if (!currentRoute) return <NotFoundPage />;
  const {route, params, query} = currentRoute;
  return route.render(params, query);
};

export default Router;
