import React, {FC} from 'react';
// eslint-disable-next-line no-restricted-imports
import {Router as ReactRouter} from 'react-router-dom';
import Router from 'src/router';
// eslint-disable-next-line no-restricted-imports
import {Provider} from 'react-redux';
import store from 'src/store';
import ToastContainer from 'src/components/atoms/ToastContainer';
import {history} from 'src/router/history';

const Root: FC = () => (
  <React.StrictMode>
    <Provider store={store}>
      <ReactRouter history={history}>
        <Router />
        <ToastContainer />
      </ReactRouter>
    </Provider>
  </React.StrictMode>
);
export default Root;
