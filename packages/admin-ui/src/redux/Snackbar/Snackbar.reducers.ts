import {
  AllSnackbarActions,
  SnackbarActionType,
  SnackbarState,
} from './Snackbar.types';

export const snackBarInitialState: SnackbarState = {
  isOpen: false,
  type: 'success',
  message: '',
};

const reducer = (state = snackBarInitialState, action: AllSnackbarActions) => {
  switch (action.type) {
    case SnackbarActionType.SET:
      return action.payload;
    case SnackbarActionType.REMOVED:
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

export default reducer;
