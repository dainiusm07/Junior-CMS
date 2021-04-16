import { CoreUserFieldsFragment } from '../../generated/gql-types';
import {
  UserActionType,
  UserLoginAction,
  UserLogoutAction,
  UserProfileFetchedAction,
} from './User.types';

export const userProfileFetched = (
  payload: CoreUserFieldsFragment | null,
): UserProfileFetchedAction => ({
  type: UserActionType.profileFetched,
  payload,
});

export const loginUser = (
  payload: CoreUserFieldsFragment,
): UserLoginAction => ({ type: UserActionType.login, payload });

export const logoutUser = (): UserLogoutAction => ({
  type: UserActionType.logout,
});
