import { AllActions, UiActionTypes, UiState } from './Ui.types';

export const initialState: UiState = {
  sideBarOpen: true,
};

const reducer = (state = initialState, action: AllActions): UiState => {
  switch (action.type) {
    case UiActionTypes.sideBarOpened:
      return { ...state, sideBarOpen: true };
    case UiActionTypes.sideBarClosed:
      return { ...state, sideBarOpen: false };
    default:
      return state;
  }
};

export default reducer;
