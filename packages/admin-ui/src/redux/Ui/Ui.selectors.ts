import { GlobalState } from '../types';

export const sideBarOpenedSelector = (state: GlobalState) =>
  state.ui.sideBarOpen;
