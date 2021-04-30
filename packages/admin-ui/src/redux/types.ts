import { SnackbarState } from './Snackbar/Snackbar.types';
import { UserState } from './User/User.types';

export interface GlobalState {
  user: UserState;
  snackbar: SnackbarState;
}

export type SimpleAction<T extends string> = {
  type: T;
};
