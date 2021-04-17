import { Permission } from '../../generated/gql-types';
import { GlobalState } from '../types';
import { UserState } from './User.types';

export const userHasPermissionSelector = (permission: Permission) => ({
  user,
}: GlobalState) =>
  Boolean(
    user?.role.permissions.some((perm) => perm === permission) ||
      user?.role.isAdmin,
  );

export const userHasAnyPermissionSelector = (permissions: Permission[]) => ({
  user,
}: GlobalState) =>
  Boolean(
    user?.role.permissions.some((perm) => permissions.includes(perm)) ||
      user?.role.isAdmin,
  );

/**
 * Removed null type because it can be null only in Login page
 */
export const currentUserSelector = (state: GlobalState) =>
  <Exclude<UserState, null>>state.user;
