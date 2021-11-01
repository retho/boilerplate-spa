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
const createRoute = <P extends Record<string, string>, Q>(route: {
  pattern: string;
  queryableInstance: Queryable<Q>;
  render: RouteRender<P, Q>;
}): AppRoute<P, Q> => createRouteCore({...route, settings: null});

export const demo = createRoute({
  pattern: '/demo',
  queryableInstance: emptyQueryableInstance,
  render: () => <DemoPage />,
});
export const root = createRoute({
  pattern: '/',
  queryableInstance: emptyQueryableInstance,
  render: () => <Redirect to={stringifyRoute(demo, {}, null)} />,
});

export const devDemoRouter = createRoute({
  pattern: '/demo/demo-router/:tab',
  queryableInstance: demoRouterPageQueryableInstance,
  render: (params: {tab: DemoRouterPageTab}, query) => (
    <DemoRouter tab={params.tab} query={query} />
  ),
});
