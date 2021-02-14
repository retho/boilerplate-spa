import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {toast, ToastOptions} from 'react-toastify';

// * https://fkhadra.github.io/react-toastify/introduction/
const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const notifyError = (content: React.ReactNode): ReturnType<typeof toast.error> =>
  toast.error(content, defaultOptions);
export const notifyWarn = (content: React.ReactNode): ReturnType<typeof toast.warn> =>
  toast.warn(content, defaultOptions);
export const notifySuccess = (content: React.ReactNode): ReturnType<typeof toast.success> =>
  toast.success(content, defaultOptions);
export const notifyInfo = (content: React.ReactNode): ReturnType<typeof toast.dark> =>
  toast.dark(content, defaultOptions);
