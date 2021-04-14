import { Typography } from '@material-ui/core';
import React from 'react';

import { FormErrorProps } from './FormError.props';

const FormError: React.FC<FormErrorProps> = ({ message, ...props }) => {
  return (
    <Typography color="error" variant="caption" {...props}>
      {message}
    </Typography>
  );
};

export default FormError;
