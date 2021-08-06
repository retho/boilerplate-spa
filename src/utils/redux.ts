// eslint-disable-next-line no-restricted-imports
import {useSelector as useSelectorOrigin} from 'react-redux';
import {AppRootState} from 'src/store';

// eslint-disable-next-line no-restricted-imports
export {useDispatch, useStore} from 'react-redux';
// eslint-disable-next-line no-restricted-imports
export {createSlice, createAction, combineReducers} from '@reduxjs/toolkit';
// eslint-disable-next-line no-restricted-imports
export type {PayloadAction} from '@reduxjs/toolkit';

const slicenameCreator = () => {
  if (process.env.NODE_ENV === 'development') {
    const alreadyUsed: Record<string, ModuleId> = {};
    return (moduleId: ModuleId, sn: string) => {
      const alreadyUsedSliceModule = alreadyUsed[sn];
      if (alreadyUsedSliceModule)
        throw new Error(
          `Slice with name '${sn}' already exists in modules "${alreadyUsedSliceModule}" and "${moduleId}"`
        );
      alreadyUsed[sn] = moduleId;
      return sn;
    };
  }
  return (_: ModuleId, sn: string) => sn;
};
export const createSliceName = slicenameCreator();

export const useSelector = <TSelected>(
  selector: (state: AppRootState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
): TSelected => useSelectorOrigin(selector, equalityFn);
