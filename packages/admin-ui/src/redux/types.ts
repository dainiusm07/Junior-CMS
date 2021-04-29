import { UserState } from './User/User.types';

export interface GlobalState {
  user: UserState;
}

export type SimpleAction<T extends string> = {
  type: T;
};
