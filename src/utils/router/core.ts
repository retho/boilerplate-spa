const empty = Symbol('empty');
export type Empty = typeof empty;

export type Query = Record<string, [undefined] | string[]>;

export type Queryable<T extends unknown> = {
  toQuery: (payload: T) => Query;
  fromQuery: (query: Query) => T;
};
export const emptyQueryableInstance: Queryable<null> = {
  fromQuery: () => null,
  toQuery: () => ({}),
};

export type Route<S extends unknown, P extends string | Empty, Q> = {
  pattern: string;
  queryableInstance: Queryable<Q>;
  render: RouteRender<P, Q>;
  settings: S;
};

export type RouteRender<P extends string | Empty, Q> = (
  params: Record<P, string>,
  queryPayload: Q
) => JSX.Element;

export const createRouteRender = <Q>(queryableInstance: Queryable<Q>) => <
  P extends string | Empty = Empty
>(
  render: RouteRender<P, Q>
): [Queryable<Q>, RouteRender<P, Q>] => [queryableInstance, render];

export const createRoute = <S, P extends string | Empty, Q>(
  pattern: string,
  [queryableInstance, render]: [Queryable<Q>, RouteRender<P, Q>],
  settings: S
): Route<S, P, Q> => ({
  pattern,
  queryableInstance: (queryableInstance as unknown) as Queryable<Q>,
  render,
  settings,
});
