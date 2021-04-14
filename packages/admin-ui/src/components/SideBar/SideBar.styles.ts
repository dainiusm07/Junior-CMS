import { makeStyles } from '@material-ui/core';

const drawerWidth = 240;

export default makeStyles((theme) => ({
  drawer: {
    zIndex: theme.zIndex.drawer,
    width: drawerWidth,
    flexShrink: 0,
    boxShadow: theme.shadows[3],
  },
  drawerPaper: {
    padding: theme.spacing(2),
    width: drawerWidth,
    position: 'relative',
  },
}));
