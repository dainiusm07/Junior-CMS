import { fade, makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  paper: {
    border: '1px solid',
    borderRadius: theme.spacing(1),
    borderColor: fade(theme.palette.common.white, 0.15),
  },
  menuList: {
    padding: theme.spacing(0.5, 0),
  },
  button: {
    color: 'inherit',
  },
  icon: {
    height: theme.spacing(2.5),
  },
}));
