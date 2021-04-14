import reducer, { initialState } from './User.reducers';
import { mockUser } from './User.test-utils';
import {
  UserActionType,
  UserLoginAction,
  UserLogoutAction,
  UserProfileFetchedAction,
} from './User.types';

const user = mockUser({});

describe('User reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as never)).toBe(initialState);
  });

  it(`should set user on ${UserActionType.profileFetched} action`, () => {
    const action: UserProfileFetchedAction = {
      type: UserActionType.profileFetched,
      payload: user,
    };

    expect(reducer(undefined, action)).toBe(user);
  });

  it(`should set user on ${UserActionType.login} action`, () => {
    const action: UserLoginAction = {
      type: UserActionType.login,
      payload: user,
    };

    expect(reducer(undefined, action)).toBe(user);
  });

  it(`should remove user on ${UserActionType.logout} action`, () => {
    const action: UserLogoutAction = {
      type: UserActionType.logout,
    };

    expect(reducer(user, action)).toBe(null);
  });
});
