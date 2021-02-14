import React, {FC} from 'react';
// eslint-disable-next-line no-restricted-imports
import {Router as ReactRouter} from 'react-router-dom';
import {history} from 'router/history';
import Router from 'router';
// eslint-disable-next-line no-restricted-imports
import {Provider} from 'react-redux';
import store from 'store';
// eslint-disable-next-line no-restricted-imports
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
