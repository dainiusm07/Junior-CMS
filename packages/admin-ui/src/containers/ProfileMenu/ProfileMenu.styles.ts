import { fade, makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.appBar + 20,
  },
  paper: {
    border: '1px solid',
    borderRadius: theme.spacing(1),
    borderColor: fade(theme.palette.common.white, 0.15),
  },
  iconButton: {
    color: 'inherit',
  },
}));
