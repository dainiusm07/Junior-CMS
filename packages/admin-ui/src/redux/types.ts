import { UserState } from './data/User/User.types';

export interface GlobalState {
  data: {
    user: UserState;
  };
}

export type SimpleAction<T extends string> = {
  type: T;
};
