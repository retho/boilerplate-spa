import {createRoute as createRouteOrigin, Route, RouteRender, Queryable} from 'utils/router/core';
import {devRender, devDemoRouterRender} from './routeRenders';

type AppRouteSettings = null;
export type AppRoute<P extends Record<string, string>, Q extends unknown> = Route<
  AppRouteSettings,
  P,
  Q
>;
const createRoute = <P extends Record<string, string>, Q>(
  pattern: string,
  routeRender: [Queryable<Q>, RouteRender<P, Q>],
  settings: AppRouteSettings = null
): AppRoute<P, Q> => createRouteOrigin(pattern, routeRender, settings);

export const dev = createRoute('/dev', devRender);
export const devDemoRouter = createRoute('/dev/demo-router/:tab', devDemoRouterRender);
