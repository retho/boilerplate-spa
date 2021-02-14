import {SyntheticEvent, useReducer} from 'react';

export const assertNever = (val: never, panic = false): void => {
  if (panic) throw new Error(`Never error: ${val}`);
};

export const stopPropagation = (e: SyntheticEvent): void => e.stopPropagation();

export const useForceRender = (): (() => void) => useReducer(s => s + 1, 0)[1];

// * https://spin.atomicobject.com/2018/01/15/typescript-flexible-nominal-typing/
const brand = Symbol('brand');
const flavor = Symbol('flavor');
export type Brand<U extends symbol, T> = {[brand]: U} & T;
export type Flavor<U extends symbol, T> = {[flavor]?: U} & T;

export const nbsp = '\xa0';
export const dash = '—';
