import { Action } from 'redux';

import { SimpleAction } from '../types';

export type SnackbarState = {
  isOpen: boolean;
  type: 'success' | 'error';
  message: string;
};

export enum SnackbarActionType {
  SET = 'snackbar/SET',
  REMOVED = 'snackbar/REMOVED',
}

export type SnackbarSetAction = Action<SnackbarActionType.SET, SnackbarState>;
export type SnackbarRemovedAction = SimpleAction<SnackbarActionType.REMOVED>;

export type AllSnackbarActions = SnackbarSetAction | SnackbarRemovedAction;
