import { Button } from '@material-ui/core';

import LoaderWrapper from '../LoaderWrapper/LoaderWrapper';
import { FormSubmitButtonProps } from './FormSubmitButton.props';

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  loading = false,
  children,
  ...props
}) => {
  return (
    <Button variant="contained" color="primary" type="submit" {...props}>
      <LoaderWrapper loading={loading}>{children}</LoaderWrapper>
    </Button>
  );
};

export default FormSubmitButton;
