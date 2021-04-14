import { Drawer, Typography } from '@material-ui/core';
import React from 'react';

import useStyles from './SideBar.styles';

const SideBar: React.FC = () => {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Typography>SideBar</Typography>
    </Drawer>
  );
};

export default SideBar;
