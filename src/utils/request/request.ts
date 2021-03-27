import {useMemo} from 'react';
import {useStore} from 'utils/redux';
import {AppStore} from 'store';
import {logoutForce} from 'store/slices/auth';

type ReplyErrorApi = {
  kind: 'api';
  status: number;
  headers: Headers;
  data: unknown;
};
type ReplyErrorUnauthorized = {kind: 'unauthorized'};
type ReplyErrorUnknown = {kind: 'unknown'; err: unknown};
type ReplyError = ReplyErrorApi | ReplyErrorUnauthorized | ReplyErrorUnknown;
type ReplySuccess<D> = {
  kind: 'success';
  status: number;
  headers: Headers;
  data: D;
};
type Reply<D> = ReplySuccess<D> | ReplyError;

export type RequestParams<D> = {
  res2data: (res: Response) => Promise<D>;
  path: string;
  config?: RequestInit;
};
export type Requester = <D>(params: RequestParams<D>) => Promise<Reply<D>>;
export const genRequest = (store: AppStore): Requester => <D>(
  params: RequestParams<D>
): Promise<Reply<D>> => {
  const {path, res2data, config} = params;
  const token = store.getState().auth.token;
  return (
    fetch(path, {
      ...config,
      headers: {
        ...config?.headers,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: token ? `Custom ${token}` : '',
      },
    })
      .then(
        async (res): Promise<Reply<D>> => {
          if (res.ok) {
            const data = await res2data(res);
            return {
              kind: 'success',
              status: res.status,
              headers: res.headers,
              data,
            };
          }
          if (res.status === 401) {
            store.dispatch(logoutForce());
            return {kind: 'unauthorized'};
          }
          const data = await res
            .clone()
            .json()
            // eslint-disable-next-line no-restricted-syntax
            .catch(() => res.clone().text());
          return {
            kind: 'api',
            status: res.status,
            headers: res.headers,
            data,
          };
        }
      )
      // eslint-disable-next-line no-restricted-syntax
      .catch(
        (err): Reply<D> => {
          return {
            kind: 'unknown',
            err,
          };
        }
      )
  );
};

export const useRequest = (): Requester => {
  const store = useStore();
  const request = useMemo(() => genRequest(store), []);
  return request;
};
