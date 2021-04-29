import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { GlobalState } from '../redux/types';
import { mockUser } from '../redux/User/User.test-utils';

const middlewares = [thunk];

export const mockStore = ({ mockedUserState = mockUser({}) }) =>
  configureStore<GlobalState>(middlewares)({
    user: mockedUserState,
  });
