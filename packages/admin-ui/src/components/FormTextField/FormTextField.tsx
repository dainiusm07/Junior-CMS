import { TextField } from '@material-ui/core';
import React from 'react';

import FormError from '../FormError/FormError';
import { FormTextFieldProps } from './FormTextField.props';
import useStyles from './FormTextField.styles';

const FormTextField: React.FC<FormTextFieldProps> = ({
  errorMessage,
  ...props
}) => {
  const classes = useStyles();
  return (
    <>
      <TextField variant="outlined" {...props} />
      {Boolean(errorMessage) && (
        <div className={classes.errorsContainer}>
          {errorMessage?.split('\n').map((message) => (
            <FormError
              key={message}
              className={classes.error}
              component="div"
              message={message}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default FormTextField;
