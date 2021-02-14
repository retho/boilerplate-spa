import {reqJson, RequestParams} from 'utils/request';
import {LoginReply} from './auth.reply';

export const loginReq = (username: string): RequestParams<LoginReply> =>
  reqJson('/api/auth/login', {
    method: 'post',
    body: {username},
  });
