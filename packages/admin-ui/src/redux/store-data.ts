import { GlobalState } from './types';
import { mockedUiState } from './Ui/Ui.test-utils';
import { UiState } from './Ui/Ui.types';
import { mockUser } from './User/User.test-utils';
import { UserState } from './User/User.types';

interface GlobalStateOverrides {
  dataUser?: UserState;
  dataUi?: UiState;
}

export const getMockedGlobalState = ({
  dataUser = mockUser({}),
  dataUi = mockedUiState,
}: GlobalStateOverrides): GlobalState => ({
  user: dataUser,
  ui: dataUi,
});
