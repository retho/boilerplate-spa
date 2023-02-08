import {ADT} from 'src/core/common';

const ls_token_key = 'token';
export const getAuthToken = (): null | string => localStorage.getItem(ls_token_key);
export const saveAuthToken = (token: null | string): void =>
  token ? localStorage.setItem(ls_token_key, token) : localStorage.removeItem(ls_token_key);

const unauthorizedEventName = 'app-unauthorized-event';
export const emitUnauthorizedEvent = (): boolean =>
  document.dispatchEvent(new Event(unauthorizedEventName));
export const addUnauthorizedEventListener = (callback: () => void): void =>
  document.addEventListener(unauthorizedEventName, callback);
export const removeUnauthorizedEventListener = (callback: () => void): void =>
  document.removeEventListener(unauthorizedEventName, callback);

type ReplyApiError<ApiErr> = {
  status: number;
  headers: Headers;
  body: ApiErr;
};
type ReplyPayload<Datum> = {
  status: number;
  headers: Headers;
  body: Datum;
};
type Reply<Datum, ApiErr> =
  | ADT<'ok', ReplyPayload<Datum>>
  | ADT<'api-error', ReplyApiError<ApiErr>>
  | ADT<'unauthorized'>
  | ADT<'unknown-error', {err: unknown}>;

export type RequestParams<Datum, ApiErr = unknown> = {
  res2data: (res: Response) => Promise<Datum>;
  res2err: (res: Response) => Promise<ApiErr>;
  path: string;
  config?: RequestInit;
};

export const req = <Datum, ApiErr>(
  params: RequestParams<Datum, ApiErr>
): Promise<Reply<Datum, ApiErr>> => {
  const {path, res2data, res2err, config} = params;
  const token = getAuthToken();
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
        async (res): Promise<Reply<Datum, ApiErr>> => {
          if (res.ok) {
            const body = await res2data(res);
            return {
              kind: 'ok',
              status: res.status,
              headers: res.headers,
              body,
            };
          }
          if (res.status === 401) {
            emitUnauthorizedEvent();
            return {kind: 'unauthorized'};
          }
          const body = await res2err(res);
          return {
            kind: 'api-error',
            status: res.status,
            headers: res.headers,
            body,
          };
        }
      )
      // eslint-disable-next-line no-restricted-syntax
      .catch(
        (error): Reply<Datum, ApiErr> => {
          return {
            kind: 'unknown-error',
            err: error,
          };
        }
      )
  );
};
