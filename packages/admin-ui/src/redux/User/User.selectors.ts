import { Permission } from '../../generated/gql-types';
import { GlobalState } from '../types';
import { UserState } from './User.types';

export const userHasPermissionSelector = (permission: Permission) => (
  state: GlobalState,
) => state.user?.role.permissions.some((perm) => perm === permission) || false;

/**
 * Removed null type because it can be null only in Login page
 */
export const currentUserSelector = (state: GlobalState) =>
  <Exclude<UserState, null>>state.user;
