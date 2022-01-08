import React from 'react';
import DemoPage from 'src/components/pages/DemoPage';
import DemoRouter, {DemoRouterPageTab} from 'src/components/pages/DemoRouter';
import {demoRouterPageQueryableInstance} from 'src/components/pages/DemoRouter/query';
import {stringifyRoute} from 'src/core/router';
import {emptyQueryableInstance, Queryable, Redirect, Route} from 'src/core/router';

export type AppRoute<Params extends Record<string, string>, Query> = Route<Params, Query> & {
  render: (params: Params, query: Query) => JSX.Element;
};
const createRoute = <Query extends unknown>(queryableInstance: Queryable<Query>) => <
  Params extends Record<string, string>
>(
  route: Omit<AppRoute<Params, Query>, 'queryableInstance'>
): AppRoute<Params, Query> => ({...route, queryableInstance});

// =
export const demo = createRoute(emptyQueryableInstance)({
  pattern: '/demo',
  render: () => <DemoPage />,
});
export const root = createRoute(emptyQueryableInstance)({
  pattern: '/',
  render: () => <Redirect to={stringifyRoute(demo, {}, {})} />,
});

export const devDemoRouter = createRoute(demoRouterPageQueryableInstance)<{
  tab: DemoRouterPageTab;
}>({
  pattern: '/demo/demo-router/:tab',
  render: ({tab}, query) => <DemoRouter tab={tab} query={query} />,
});
