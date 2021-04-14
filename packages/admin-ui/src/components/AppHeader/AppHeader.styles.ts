import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.paper,
  },
}));
