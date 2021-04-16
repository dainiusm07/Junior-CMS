import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { GlobalState } from './types';
import { mockedUiState } from './Ui/Ui.test-utils';
import { mockUser } from './User/User.test-utils';

const middlewares = [thunk];

export const mockStore = ({ mockedUserState = mockUser({}) }) =>
  configureStore<GlobalState>(middlewares)({
    user: mockedUserState,
    ui: mockedUiState,
  });
