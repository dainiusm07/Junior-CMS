import { Snackbar, SnackbarProps } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeSnackbar } from '../../redux/Snackbar/Snackbar.actions';
import {
  snackbarIsOpenSelector,
  snackbarMessageSelector,
  snackbarTypeSelector,
} from '../../redux/Snackbar/Snackbar.selectors';

const CmsSnackBar: React.FC<SnackbarProps> = (props) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(snackbarIsOpenSelector);
  const message = useSelector(snackbarMessageSelector);
  const type = useSelector(snackbarTypeSelector);

  const handleClose = () => {
    dispatch(removeSnackbar());
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={5000}
      onClose={handleClose}
      {...props}
    >
      <Alert
        style={{ flexGrow: 1 }}
        onClose={handleClose}
        variant="filled"
        severity={type}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CmsSnackBar;
