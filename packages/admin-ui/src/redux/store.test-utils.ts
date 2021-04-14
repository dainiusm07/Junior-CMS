import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { mockUser } from './data/User/User.test-utils';
import { GlobalState } from './types';

const middlewares = [thunk];

export const mockStore = ({ mockedUserState = mockUser({}) }) =>
  configureStore<GlobalState>(middlewares)({
    data: { user: mockedUserState },
  });
