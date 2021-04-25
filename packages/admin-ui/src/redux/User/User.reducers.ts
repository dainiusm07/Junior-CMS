import { AllActions, UserActionType, UserState } from './User.types';

export const initialState: UserState = null;

const reducer = (
  state: UserState = initialState,
  action: AllActions,
): UserState => {
  switch (action.type) {
    case UserActionType.update:
    case UserActionType.login:
      return action.payload;

    case UserActionType.profileFetched:
      return action.payload;

    case UserActionType.logout:
      return null;

    default:
      return state;
  }
};

export default reducer;
