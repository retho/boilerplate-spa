import React from 'react';
import {Redirect} from 'react-router';
import DemoPage from 'src/components/pages/DemoPage';
import DemoRouter, {DemoRouterPageTab} from 'src/components/pages/DemoRouter';
import {demoRouterPageQueryableInstance} from 'src/components/pages/DemoRouter/query';
import {stringifyRoute} from 'src/core/router';
import {
  createRoute as createRouteCore,
  emptyQueryableInstance,
  Queryable,
  Route,
  RouteRender,
} from 'src/core/router/core';

type AppRouteSettings = null;
export type AppRoute<P extends Record<string, string>, Q extends unknown> = Route<
  AppRouteSettings,
  P,
  Q
>;
const createRoute = <Q extends unknown>(queryableInstance: Queryable<Q>) => <
  P extends Record<string, string>
>(route: {
  pattern: string;
  render: RouteRender<P, Q>;
}): AppRoute<P, Q> => createRouteCore({...route, queryableInstance, settings: null});

// =====
export const demo = createRoute(emptyQueryableInstance)({
  pattern: '/demo',
  render: () => <DemoPage />,
});
export const root = createRoute(emptyQueryableInstance)({
  pattern: '/',
  render: () => <Redirect to={stringifyRoute(demo, {}, null)} />,
});

export const devDemoRouter = createRoute(demoRouterPageQueryableInstance)<{
  tab: DemoRouterPageTab;
}>({
  pattern: '/demo/demo-router/:tab',
  render: ({tab}, query) => <DemoRouter tab={tab} query={query} />,
});
