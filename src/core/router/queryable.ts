import {compact, mapKeys} from 'lodash-es';

import {Queryable, RawQuery} from './core';
2;
export const withPrefix = <V extends unknown>(
  prefix: string,
  queryableInstance: Queryable<V>
): Queryable<V> => {
  const addPrefixStr = (pfx: string, key: string): string => {
    const fst = key[0] || '';
    const rest = key.slice(1);
    return pfx + fst.toUpperCase() + rest;
  };
  const addPrefix = (pfx: string, query: RawQuery): RawQuery =>
    mapKeys(query, (_, k) => addPrefixStr(pfx, k));
  const removePrefix = (pfx: string, query: RawQuery): RawQuery => {
    return new Proxy(query, {
      get: (target, name) => target[addPrefixStr(pfx, name as string)],
    });
  };
  return {
    toQuery: payload => addPrefix(prefix, queryableInstance.toQuery(payload)),
    fromQuery: query => queryableInstance.fromQuery(removePrefix(prefix, query)),
  };
};

export const iqgenForOptional = <V extends unknown>(
  iq: Queryable<null | V>
): Queryable<undefined | null | V> => iq as Queryable<undefined | null | V>;

export const iqgenForString = <Val extends string>(prefix: string): Queryable<null | Val> => ({
  toQuery: val => (val ? {[prefix]: [val]} : {}),
  fromQuery: query => {
    const [val] = query[prefix] || [];
    return val ? (val as Val) : null;
  },
});
export const iqgenForArray = <Val extends string>(
  prefix: string,
  parser: {toString: (val: Val) => string; fromString: (str: string) => null | Val}
): Queryable<Val[]> => ({
  toQuery: val => {
    if (!val) return {};
    return {[prefix]: val.map(x => parser.toString(x))};
  },
  fromQuery: query => {
    const val = query[prefix];
    return compact((val || []).map(x => parser.fromString(x)));
  },
});

type InferComposedQueryables<R extends Record<string, unknown>> = {
  [K in keyof R]: Queryable<R[K]>;
};
export const iqgenForRecord = <R extends Partial<Record<string, unknown>>>(
  iqs: InferComposedQueryables<R>
): Queryable<R> => ({
  toQuery: payload => {
    return Object.entries(iqs)
      .map(([key, iq]) => (iq as Queryable<unknown>).toQuery(payload[key]))
      .reduce((acc, c) => ({...acc, ...c}), {});
  },
  fromQuery: query => {
    const payload = Object.fromEntries(
      Object.entries(iqs).map(([colId, iq]) => {
        const val = (iq as Queryable<unknown>).fromQuery(query);
        return [colId, val];
      })
    );
    return payload as R;
  },
});
