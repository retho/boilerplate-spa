import {SyntheticEvent, useReducer} from 'react';

export const assertNever = (val: never): never => val;

export const stopPropagation = (e: SyntheticEvent): void => e.stopPropagation();

export const useForceRender = (): (() => void) => useReducer(s => s + 1, 0)[1];

// * https://spin.atomicobject.com/2018/01/15/typescript-flexible-nominal-typing/
const brand = Symbol('brand');
const flavor = Symbol('flavor');
export type Brand<U extends symbol, T> = {[brand]: U} & T;
export type Flavor<U extends symbol, T> = {[flavor]?: U} & T;

export const nbsp = '\xa0';
export const dash = '—';

// eslint-disable-next-line @typescript-eslint/ban-types
export type ADT<K extends string, P = {}> = {kind: K} & P;

export type Result<E, R> = ADT<'err', {err: E}> | ADT<'ok', {payload: R}>;
export const ok = <E, R>(payload: R): Result<E, R> => ({kind: 'ok', payload});
export const err = <E, R>(error: E): Result<E, R> => ({kind: 'err', err: error});
