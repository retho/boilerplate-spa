// eslint-disable-next-line no-restricted-imports
import {Action, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {ThunkAction} from 'redux-thunk';
import {genRequest, Requester} from 'src/core/request';

import {reducer} from './root';

const thunkExtraArgument = {
  request: (null as unknown) as Requester,
};

const store = configureStore({
  reducer,
  middleware: [
    ...getDefaultMiddleware({
      thunk: {extraArgument: thunkExtraArgument},
      immutableCheck: true,
      serializableCheck: true,
    }),
  ],
});
thunkExtraArgument.request = genRequest(store);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./root', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const {reducer: newRootReducer} = require('./root').default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppStore = typeof store;
export type AppRootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<R = Promise<void>> = ThunkAction<
  R,
  AppRootState,
  typeof thunkExtraArgument,
  Action<string>
>;

export default store;
