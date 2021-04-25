import { CoreUserFieldsFragment } from '../../generated/gql-types';
import {
  UserActionType,
  UserLoginAction,
  UserLogoutAction,
  UserProfileFetchedAction,
  UserUpdateAction,
} from './User.types';

export const userProfileFetched = (
  payload: CoreUserFieldsFragment | null,
): UserProfileFetchedAction => ({
  type: UserActionType.profileFetched,
  payload,
});

export const updateUser = (
  payload: CoreUserFieldsFragment,
): UserUpdateAction => ({ type: UserActionType.update, payload });

export const loginUser = (
  payload: CoreUserFieldsFragment,
): UserLoginAction => ({ type: UserActionType.login, payload });

export const logoutUser = (): UserLogoutAction => ({
  type: UserActionType.logout,
});
