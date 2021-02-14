const empty = Symbol('empty');
export type Empty = typeof empty;

export type Query<Q extends string | Empty> = Record<Q, [undefined] | string[]>;

export type Queryable<Q extends string | Empty, D extends unknown> = {
  toQuery: (payload: D) => Query<Q>;
  fromQuery: (query: Query<Q>) => D;
};
export const emptyQueryableInstance: Queryable<Empty, null> = {
  fromQuery: () => null,
  toQuery: () => ({} as Query<Empty>),
};

export type Route<S extends unknown, P extends string | Empty, QP> = {
  pattern: string;
  queryableInstance: Queryable<string | Empty, QP>;
  render: RouteRender<P, QP>;
  settings: S;
};

export type RouteRender<P extends string | Empty, QP> = (
  params: Record<P, string>,
  queryPayload: QP
) => JSX.Element;

export const createRouteRender = <Q extends string | Empty, QP>(
  queryableInstance: Queryable<Q, QP>
) => <P extends string | Empty = Empty>(
  render: RouteRender<P, QP>
): [Queryable<Q, QP>, RouteRender<P, QP>] => [queryableInstance, render];

export const createRoute = <S, P extends string | Empty, Q extends string | Empty, QP>(
  pattern: string,
  [queryableInstance, render]: [Queryable<Q, QP>, RouteRender<P, QP>],
  settings: S
): Route<S, P, QP> => ({
  pattern,
  queryableInstance: (queryableInstance as unknown) as Queryable<string | Empty, QP>,
  render,
  settings,
});
