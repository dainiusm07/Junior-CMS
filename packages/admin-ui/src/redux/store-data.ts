import { snackBarInitialState } from './Snackbar/Snackbar.reducers';
import { SnackbarState } from './Snackbar/Snackbar.types';
import { GlobalState } from './types';
import { mockUser } from './User/User.test-utils';
import { UserState } from './User/User.types';

interface GlobalStateOverrides {
  dataUser?: UserState;
  dataSnackbar?: SnackbarState;
}

export const getMockedGlobalState = ({
  dataUser = mockUser({}),
  dataSnackbar = snackBarInitialState,
}: GlobalStateOverrides): GlobalState => ({
  user: dataUser,
  snackbar: dataSnackbar,
});
