import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.paper,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 2),
  },
  content: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
}));
