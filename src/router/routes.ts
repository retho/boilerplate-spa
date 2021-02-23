import {
  createRoute as createRouteOrigin,
  Route,
  Empty,
  RouteRender,
  Queryable,
} from 'utils/router/core';
import {devRender, devDemoQueryRender} from './routeRenders';

type AppRouteSettings = null;
export type AppRoute<P extends string | Empty, QP extends unknown> = Route<AppRouteSettings, P, QP>;
const createRoute = <P extends string | Empty, Q extends string | Empty, QP>(
  pattern: string,
  routeRender: [Queryable<Q, QP>, RouteRender<P, QP>],
  settings: AppRouteSettings = null
): AppRoute<P, QP> => createRouteOrigin(pattern, routeRender, settings);

export const dev = createRoute('/dev', devRender);
export const devDemoQuery = createRoute('/dev/demo-query', devDemoQueryRender);
