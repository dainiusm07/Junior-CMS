import { combineReducers } from 'redux';

import { GlobalState } from './types';
import UiReducer from './Ui/Ui.reducers';
import UserReducer from './User/User.reducers';

const reducers = combineReducers<GlobalState>({
  user: UserReducer,
  ui: UiReducer,
});

export default reducers;
