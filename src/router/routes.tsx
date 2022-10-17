import React from 'react';
import {stringifyRoute} from 'src/core/router';
import {emptyQueryableInstance, Redirect, Route} from 'src/core/router';
import {declareRouteParams} from 'src/core/router/core';
import DemoPage from 'src/pages/DemoPage';
import DemoRouter, {DemoRouterPageTab} from 'src/pages/DemoRouter';
import {iqDemoRouterPage} from 'src/pages/DemoRouter/query';

export type AppRoute<Params, Query> = Route<Params, Query> & {
  render: (params: Params, query: Query) => JSX.Element;
};
const createRoute = <Params extends Record<string, string>, Query>(
  route: AppRoute<Params, Query>
): AppRoute<Params, Query> => route;

// =
export const demo = createRoute({
  pattern: '/demo',
  params: declareRouteParams(),
  query: emptyQueryableInstance,
  render: () => <DemoPage />,
});
export const root = createRoute({
  pattern: '/',
  params: declareRouteParams(),
  query: emptyQueryableInstance,
  render: () => <Redirect to={stringifyRoute(demo, {}, {})} />,
});

export const demoRouter = createRoute({
  pattern: '/demo/demo-router/:tab',
  params: declareRouteParams<{tab: DemoRouterPageTab}>(),
  query: iqDemoRouterPage,
  render: ({tab}, query) => <DemoRouter tab={tab} query={query} />,
});
