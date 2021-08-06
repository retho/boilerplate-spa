import {
  createRoute as createRouteOrigin,
  Route,
  RouteRender,
  Queryable,
} from 'src/utils/router/core';
import * as routeRenders from './routeRenders';

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

export const root = createRoute('/', routeRenders.rootRender);
export const dev = createRoute('/dev', routeRenders.devRender);
export const devDemoRouter = createRoute('/dev/demo-router/:tab', routeRenders.devDemoRouterRender);
