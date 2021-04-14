import { Button, CircularProgress } from '@material-ui/core';

import { FormSubmitButtonProps } from './FormSubmitButton.props';
import useStyles from './FormSubmitButton.styles';

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  loading,
  children,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Button variant="contained" color="primary" type="submit" {...props}>
      <div className={classes.root}>
        {loading && (
          <div className={classes.loaderRoot}>
            <div className={classes.loaderWrapper}>
              <CircularProgress className={classes.loader} color="inherit" />
            </div>
          </div>
        )}
        <div style={{ opacity: loading ? 0 : 1 }}>{children}</div>
      </div>
    </Button>
  );
};

export default FormSubmitButton;
