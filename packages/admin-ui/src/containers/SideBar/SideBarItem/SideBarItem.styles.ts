import { fade, makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  button: {
    textTransform: 'capitalize',
    textAlign: 'left',
    justifyContent: 'flex-start',
    borderRadius: theme.spacing(0.5),
    color: 'inherit',
  },
  link: {
    textDecoration: 'none',
    textDecorationColor: 'none',
    color: fade(theme.palette.common.white, 0.65),
  },
  active: {
    color: theme.palette.primary.main,
  },
  iconRoot: {
    margin: theme.spacing(0),
  },
}));
