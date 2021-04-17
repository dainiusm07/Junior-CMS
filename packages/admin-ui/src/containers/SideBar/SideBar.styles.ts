import { makeStyles } from '@material-ui/core';

const drawerWidth = 240;

export default makeStyles((theme) => ({
  drawer: {
    zIndex: `${theme.zIndex.appBar - 1} !important` as never,
    width: drawerWidth,
    flexShrink: 0,
    [theme.breakpoints.down('xs')]: {
      position: 'absolute !important',
    },
  },
  drawerPaper: {
    padding: theme.spacing(0, 2, 2),
    width: drawerWidth,
    position: 'relative',
  },
  backdrop: {
    position: 'absolute !important' as 'absolute',
    minWidth: '100vw',
  },
}));
