import { Permission } from '../../../generated/gql-types';
import { getMockedGlobalState } from '../../store-data';
import {
  currentUserSelector,
  userHasPermissionSelector,
} from './User.selectors';
import { mockUser } from './User.test-utils';
import { UserState } from './User.types';

const wrap = (dataUser: UserState) => getMockedGlobalState({ dataUser });

describe('User selectors', () => {
  it('should return true when user has needed permissions', () => {
    const state = wrap(mockUser({ permissions: [Permission.ReadUser] }));

    const selector = userHasPermissionSelector(Permission.ReadUser);

    expect(selector(state)).toBe(true);
  });

  it(`should false when user doesn't have needed permissions`, () => {
    const state = wrap(mockUser({ permissions: [Permission.ReadUser] }));

    const selector = userHasPermissionSelector(Permission.UpdateUser);

    expect(selector(state)).toBe(false);
  });

  it('should return currently set user', () => {
    const user = mockUser({ permissions: [Permission.DeleteUser] });

    const state = wrap(user);

    expect(currentUserSelector(state)).toStrictEqual(user);
  });
});
