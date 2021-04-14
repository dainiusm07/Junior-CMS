import { TextField, TextFieldProps } from '@material-ui/core';
import React from 'react';

const FormTextField: React.FC<TextFieldProps> = (props) => {
  return <TextField variant="outlined" {...props} />;
};

export default FormTextField;
