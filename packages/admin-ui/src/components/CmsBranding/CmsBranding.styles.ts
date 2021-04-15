import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  img: {
    height: 30,
    width: 30,
    marginRight: theme.spacing(2),
  },
}));
