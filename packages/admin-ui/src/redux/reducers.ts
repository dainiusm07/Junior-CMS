import { combineReducers } from 'redux';

import { GlobalState } from './types';
import UserReducer from './User/User.reducers';

const reducers = combineReducers<GlobalState>({
  user: UserReducer,
});

export default reducers;
