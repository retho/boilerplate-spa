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
const req = <Datum, ApiErr>(args: {
  path: string;
  opts: ReqOptions;
  res2data: (res: Response) => Promise<Datum>;
  res2err: (res: Response) => Promise<ApiErr>;
  init?: RequestInit;
}): RequestParams<Datum, ApiErr> => {
  const {path, opts, res2data, res2err, init} = args;
  const {method = 'get', params, body} = opts || {};
  return {
    res2data,
    res2err,
    path: path + (isEmpty(params) ? '' : '?' + stringifyQuery(params || {})),
    config: merge({}, configurationDefault, init, {method}, body && {body: JSON.stringify(body)}),
  };
};

const res2err = (res: Response): Promise<unknown> => res.text();

export const reqJson = <Datum>(path: string, opts?: ReqOptions): RequestParams<Datum, unknown> =>
  req({path, opts: opts || {}, res2data: res => res.json(), res2err});
export const reqBlob = (path: string, opts?: ReqOptions): RequestParams<Blob, unknown> =>
  req({path, opts: opts || {}, res2data: res => res.blob(), res2err});
