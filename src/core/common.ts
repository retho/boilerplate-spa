import {useReducer} from 'react';

export const panic = (error_message: string): never => {
  throw new Error(error_message);
};
export const assertNever = (val: never): never =>
  panic(`Unexpected never value: ${JSON.stringify(val)}`);
export const assertNeverNoPanic = (val: never): void => val;

export const useForceRender = (): (() => void) => useReducer(s => s + 1, 0)[1];

export const sleep = (ms: number): Promise<void> => new Promise(rsv => setTimeout(rsv, ms));

export const nbsp = '\xa0';
export const dash = '—';

// eslint-disable-next-line
export {nanoid} from '@reduxjs/toolkit';

// * https://habr.com/ru/company/oleg-bunin/blog/499634/
// * https://spin.atomicobject.com/2018/01/15/typescript-flexible-nominal-typing/
// * https://habr.com/ru/company/oleg-bunin/blog/499634/
declare const brand: unique symbol;
export type Brand<TypeName extends string, T> = {[brand]: TypeName} & T;
// *
declare const meta: unique symbol;
export type Strong<TypeName extends string, DuckType> = {
  [meta]: {
    name: TypeName;
    actualType: DuckType;
  };
};
export const unsafe_strong_pack = <DuckType, StrongType extends Strong<string, DuckType>>(
  value: DuckType
): StrongType => (value as unknown) as StrongType;
export const unsafe_strong_unpack = <DuckType, StrongType extends Strong<string, DuckType>>(
  value: StrongType
): DuckType => (value as unknown) as DuckType;

// * https://stackoverflow.com/questions/33915459/algebraic-data-types-in-typescript
// * https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions
// eslint-disable-next-line @typescript-eslint/ban-types
export type ADT<K extends string, P = {}> = {kind: K} & P;

export type ResultOk<R> = ADT<'ok', {payload: R}>;
export type ResultErr<E> = ADT<'err', {error: E}>;
export type Result<E, R> = ResultErr<E> | ResultOk<R>;
export const ok = <R>(payload: R): ResultOk<R> => ({kind: 'ok', payload});
export const err = <E>(error: E): ResultErr<E> => ({kind: 'err', error});
