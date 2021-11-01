export type Query = Record<string, [undefined] | string[]>;

export type Queryable<T extends unknown> = {
  toQuery: (payload: T) => Query;
  fromQuery: (query: Query) => T;
};
export const emptyQueryableInstance: Queryable<null> = {
  fromQuery: () => null,
  toQuery: () => ({}),
};

export type Route<S extends unknown, P extends Record<string, string>, Q> = {
  pattern: string;
  settings: S;
  queryableInstance: Queryable<Q>;
  render: RouteRender<P, Q>;
};

export type RouteRender<P extends Record<string, string>, Q> = (
  params: P,
  queryPayload: Q
) => JSX.Element;

export const createRoute = <S, P extends Record<string, string>, Q>(
  route: Route<S, P, Q>
): Route<S, P, Q> => route;
