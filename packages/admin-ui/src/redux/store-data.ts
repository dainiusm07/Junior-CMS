import { GlobalState } from './types';
import { mockUser } from './User/User.test-utils';
import { UserState } from './User/User.types';

interface GlobalStateOverrides {
  dataUser?: UserState;
}

export const getMockedGlobalState = ({
  dataUser = mockUser({}),
}: GlobalStateOverrides): GlobalState => ({
  user: dataUser,
});
