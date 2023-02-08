import {loginReq} from 'src/api/auth';
import {createSlice, createSliceName, PayloadAction} from 'src/core/redux';
import {getAuthToken, req, saveAuthToken} from 'src/core/request';
import {AppThunk} from 'src/store';
import {notifyError} from 'src/utils/toastify';

const sliceName = createSliceName(module.id, 'auth');

type State = {
  isAuthorized: boolean;
};
const defaultState: State = {
  isAuthorized: false,
};
const slice = createSlice({
  name: sliceName,
  initialState: {...defaultState, isAuthorized: !!getAuthToken()},
  reducers: {
    reset: () => defaultState,
    setIsAuthorized: (state, {payload}: PayloadAction<boolean>) => ({
      ...state,
      token: payload,
    }),
  },
});

export const {reducer} = slice;
export const {reset} = slice.actions;
const {setIsAuthorized} = slice.actions;

export const login = (username: string): AppThunk => async dispatch => {
  const reply = await req(loginReq(username));
  if (reply.kind === 'ok') {
    saveAuthToken(reply.body.token);
    dispatch(setIsAuthorized(!!reply.body.token));
  } else if (reply.kind !== 'unauthorized') {
    notifyError('Something went wrong');
  }
};

export const logoutForce = (): AppThunk => async dispatch => {
  saveAuthToken(null);
  localStorage.clear();
  dispatch(setIsAuthorized(false));
};
