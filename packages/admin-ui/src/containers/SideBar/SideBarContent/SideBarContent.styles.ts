import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(3),
    },
  },
}));
