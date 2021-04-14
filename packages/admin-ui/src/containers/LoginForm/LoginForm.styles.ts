import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(2),
  },
  root: {
    flexShrink: 1,
    padding: theme.spacing(4),
    maxWidth: 480,
  },
  formField: {
    margin: theme.spacing(2, 0),
  },
  formError: {
    marginTop: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));
