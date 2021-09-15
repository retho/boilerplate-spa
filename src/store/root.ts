import {combineReducers} from 'src/core/redux';

import {reducer as app} from './slices/app';
import {reducer as auth} from './slices/auth';

const rootReducer = combineReducers({
  app,
  auth,
});

export {rootReducer as reducer};
