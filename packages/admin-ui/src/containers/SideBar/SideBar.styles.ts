import { makeStyles } from '@material-ui/core';

const drawerWidth = 240;

export default makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  drawerPaper: {
    padding: theme.spacing(0, 2, 2),
    width: drawerWidth,
    position: 'relative',
  },
}));
