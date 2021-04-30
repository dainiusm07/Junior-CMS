import { GlobalState } from '../types';

export const snackbarIsOpenSelector = (state: GlobalState) =>
  state.snackbar.isOpen;

export const snackbarTypeSelector = (state: GlobalState) => state.snackbar.type;

export const snackbarMessageSelector = (state: GlobalState) =>
  state.snackbar.message;
