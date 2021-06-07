import {useMemo} from 'react';
import {useStore} from 'utils/redux';
import {AppStore} from 'store';
import {logoutForce} from 'store/slices/auth';
import {ADT, err, ok, Result} from 'utils/common';

type ReplyErrorApi = {
  status: number;
  headers: Headers;
  data: unknown;
};
type ReplyError = ADT<'api', ReplyErrorApi> | ADT<'unauthorized'> | ADT<'unknown', {err: unknown}>;
type ReplyPayload<D> = {
  status: number;
  headers: Headers;
  data: D;
};
type Reply<D> = Result<ReplyError, ReplyPayload<D>>;

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
      credentials: 'omit',
    })
      .then(
        async (res): Promise<Reply<D>> => {
          if (res.ok) {
            const data = await res2data(res);
            return ok({
              status: res.status,
              headers: res.headers,
              data,
            });
          }
          if (res.status === 401) {
            store.dispatch(logoutForce());
            return err({kind: 'unauthorized'});
          }
          const data = await res
            .clone()
            .json()
            // eslint-disable-next-line no-restricted-syntax
            .catch(() => res.clone().text());
          return err({
            kind: 'api',
            status: res.status,
            headers: res.headers,
            data,
          });
        }
      )
      // eslint-disable-next-line no-restricted-syntax
      .catch(
        (error): Reply<D> => {
          return err({
            kind: 'unknown',
            err: error,
          });
        }
      )
  );
};

export const useRequest = (): Requester => {
  const store = useStore();
  const request = useMemo(() => genRequest(store), []);
  return request;
};
