import { combineReducers } from 'redux';

import UserReducer from './data/User/User.reducers';
import { GlobalState } from './types';

const reducers = combineReducers<GlobalState>({
  data: combineReducers<GlobalState['data']>({
    user: UserReducer,
  }),
});

export default reducers;
