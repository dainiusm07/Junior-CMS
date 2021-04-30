import { combineReducers } from 'redux';

import SnackbarReducer from './Snackbar/Snackbar.reducers';
import { GlobalState } from './types';
import UserReducer from './User/User.reducers';

const reducers = combineReducers<GlobalState>({
  user: UserReducer,
  snackbar: SnackbarReducer,
});

export default reducers;
