import {isEmpty, merge} from 'lodash-es';
import {stringify as stringifyQuery} from 'query-string';

import {RequestParams} from './request';

const configurationDefault: RequestInit = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
};

type Method = 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch' | 'link' | 'unlink';

export type ReqOptions = {
  method?: Method;
  params?: Record<string, string | number | boolean | readonly string[] | null | undefined>;
  body?: unknown;
};
const req = <D>(
  path: string,
  opts: ReqOptions,
  res2data: (res: Response) => Promise<D>,
  init?: RequestInit
): RequestParams<D> => {
  const {method = 'get', params, body} = opts || {};
  return {
    res2data,
    path: path + (isEmpty(params) ? '' : '?' + stringifyQuery(params || {})),
    config: merge({}, configurationDefault, init, {method}, body && {body: JSON.stringify(body)}),
  };
};

export const reqJson = <D>(path: string, opts?: ReqOptions): RequestParams<D> =>
  req(path, opts || {}, res => res.json());
export const reqBlob = (path: string, opts?: ReqOptions): RequestParams<Blob> =>
  req(path, opts || {}, res => res.blob());
