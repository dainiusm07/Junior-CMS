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
  [
    {
      description: 'should return true when user has needed permission',
      user: mockUser({ permissions: [Permission.ReadUser] }),
      neededPermission: Permission.ReadUser,
      expected: true,
    },
    {
      description: `should false when user doesn't have needed permission`,
      user: mockUser({ permissions: [Permission.ReadUser] }),
      neededPermission: Permission.UpdateUser,
      expected: false,
    },
    {
      description: `should return true when user doesn't have needed permission but has admin role`,
      user: mockUser({ permissions: [], isAdmin: true }),
      neededPermission: Permission.UpdateUser,
      expected: true,
    },
  ].forEach(({ description, user, neededPermission, expected }) => {
    it(description, () => {
      const state = wrap(user);

      const selector = userHasPermissionSelector(neededPermission);

      expect(selector(state)).toBe(expected);
    });
  });

  it('should return currently set user', () => {
    const user = mockUser({ permissions: [Permission.DeleteUser] });

    const state = wrap(user);

    expect(currentUserSelector(state)).toStrictEqual(user);
  });

  [
    {
      description: `should return false when user does not have at least one of needed permissions`,
      user: mockUser({ permissions: [Permission.ReadProduct] }),
      neededPermissions: [Permission.CreateCategory],
      expected: false,
    },
    {
      description: `should return true when user has at least one of needed permissions`,
      user: mockUser({ permissions: [Permission.ReadProduct] }),
      neededPermissions: [Permission.CreateCategory, Permission.ReadProduct],
      expected: true,
    },
    {
      description: `should return true when user does not have at least one of needed permissions
      but has admin role`,
      user: mockUser({ permissions: [], isAdmin: true }),
      neededPermissions: [Permission.CreateCategory],
      expected: true,
    },
  ].forEach(({ description, user, neededPermissions, expected }) => {
    it(description, () => {
      const state = wrap(user);

      const selector = userHasAnyPermissionSelector(neededPermissions);

      expect(selector(state)).toBe(expected);
    });
  });
});
