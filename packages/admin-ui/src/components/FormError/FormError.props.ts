import { TypographyProps } from '@material-ui/core';
import React from 'react';

export interface FormErrorProps extends TypographyProps {
  message: string;
  component?: React.ElementType;
}
