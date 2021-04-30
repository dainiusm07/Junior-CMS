import {
  SnackbarActionType,
  SnackbarRemovedAction,
  SnackbarSetAction,
  SnackbarState,
} from './Snackbar.types';

export const setSnackbar = ({
  type = 'success',
  message,
}: {
  type?: SnackbarState['type'];
  message: string;
}): SnackbarSetAction => ({
  type: SnackbarActionType.SET,
  payload: {
    isOpen: true,
    type,
    message,
  },
});

export const removeSnackbar = (): SnackbarRemovedAction => ({
  type: SnackbarActionType.REMOVED,
});
