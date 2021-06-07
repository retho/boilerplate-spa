import {SyntheticEvent, useReducer} from 'react';

export const assertNever = (val: never): never => val;

export const stopPropagation = (e: SyntheticEvent): void => e.stopPropagation();

export const useForceRender = (): (() => void) => useReducer(s => s + 1, 0)[1];

export const nbsp = '\xa0';
export const dash = '—';

// * https://spin.atomicobject.com/2018/01/15/typescript-flexible-nominal-typing/
const brand = Symbol('brand');
const flavor = Symbol('flavor');
export type Brand<U extends symbol, T> = {[brand]: U} & T;
export type Flavor<U extends symbol, T> = {[flavor]?: U} & T;

// * https://stackoverflow.com/questions/33915459/algebraic-data-types-in-typescript
// eslint-disable-next-line @typescript-eslint/ban-types
export type ADT<K extends string, P = {}> = {kind: K} & P;

export type ResultOk<R> = ADT<'ok', {payload: R}>;
export type ResultErr<E> = ADT<'err', {error: E}>;
export type Result<E, R> = ResultErr<E> | ResultOk<R>;
export const ok = <R>(payload: R): ResultOk<R> => ({kind: 'ok', payload});
export const err = <E>(error: E): ResultErr<E> => ({kind: 'err', error});
