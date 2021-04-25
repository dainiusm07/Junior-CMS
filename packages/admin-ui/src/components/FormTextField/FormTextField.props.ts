import { TextFieldProps } from '@material-ui/core';

export type FormTextFieldProps = TextFieldProps & {
  errorMessage?: string;
  name: string;
};
