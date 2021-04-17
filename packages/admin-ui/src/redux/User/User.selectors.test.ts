import { Permission } from '../../generated/gql-types';
import { getMockedGlobalState } from '../store-data';
import {
  currentUserSelector,
  userHasAnyPermissionSelector,
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

  [
    {
      userPermissions: [Permission.ReadProduct],
      neededPermissions: [Permission.CreateCategory],
      expected: false,
    },
    {
      userPermissions: [Permission.ReadProduct],
      neededPermissions: [Permission.CreateCategory, Permission.ReadProduct],
      expected: true,
    },
  ].forEach(({ userPermissions, neededPermissions, expected }) => {
    it(`should return ${expected} when user ${
      expected ? 'has' : 'does not have'
    } at least one of needed permissions`, () => {
      const state = wrap(mockUser({ permissions: userPermissions }));

      const selector = userHasAnyPermissionSelector(neededPermissions);

      expect(selector(state)).toBe(expected);
    });
  });
});
