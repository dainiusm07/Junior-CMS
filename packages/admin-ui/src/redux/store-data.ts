import { mockUser } from './data/User/User.test-utils';
import { UserState } from './data/User/User.types';
import { GlobalState } from './types';

interface GlobalStateOverrides {
  dataUser: UserState;
}

export const getMockedGlobalState = ({
  dataUser = mockUser({}),
}: GlobalStateOverrides): GlobalState => ({
  data: {
    user: dataUser,
  },
});
