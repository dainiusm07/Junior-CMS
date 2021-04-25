import { Action } from 'redux';

import { CoreUserFieldsFragment } from '../../generated/gql-types';
import { SimpleAction } from '../types';

export type UserState = CoreUserFieldsFragment | null;

export enum UserActionType {
  login = 'user/LOGIN',
  logout = 'user/LOGOUT',
  profileFetched = 'user/PROFILE_FETCHED',
  update = 'user/UPDATE',
}

export type UserProfileFetchedAction = Action<
  UserActionType.profileFetched,
  CoreUserFieldsFragment | null
>;
export type UserLoginAction = Action<
  UserActionType.login,
  CoreUserFieldsFragment
>;

export type UserUpdateAction = Action<
  UserActionType.update,
  CoreUserFieldsFragment
>;
export type UserLogoutAction = SimpleAction<UserActionType.logout>;

export type AllActions =
  | UserProfileFetchedAction
  | UserLoginAction
  | UserLogoutAction
  | UserUpdateAction;
