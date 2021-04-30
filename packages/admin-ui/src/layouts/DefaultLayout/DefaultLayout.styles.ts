import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  snackbar: {
    top: theme.spacing(9.5),
    [theme.breakpoints.down('xs')]: {
      top: theme.spacing(8),
    },
  },
  body: {
    flexGrow: 1,
    display: 'flex',
    position: 'relative',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
  },
}));
