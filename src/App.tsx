import React, {FC} from 'react';
// eslint-disable-next-line no-restricted-imports
import {Provider} from 'react-redux';
import ToastContainer from 'src/components/atoms/ToastContainer';
import {RouterProvider} from 'src/core/router';
import Router from 'src/router';
import {history} from 'src/router/history';
import store from 'src/store';

const Root: FC = () => (
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider history={history}>
        <Router />
        <ToastContainer />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
export default Root;
