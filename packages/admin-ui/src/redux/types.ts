import { UiState } from './Ui/Ui.types';
import { UserState } from './User/User.types';

export interface GlobalState {
  user: UserState;
  ui: UiState;
}

export type SimpleAction<T extends string> = {
  type: T;
};
