import { Toolbar } from '@material-ui/core';
import React, { useState } from 'react';

import AppHeader from '../../containers/AppHeader/AppHeader';
import SideBar from '../../containers/SideBar/SideBar';
import useStyles from './DefaultLayout.styles';

const DefaultLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const handleSideBarOpen = () => {
    setSideBarOpen(true);
  };

  const handleSideBarClose = () => {
    setSideBarOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppHeader handleSideBarOpen={handleSideBarOpen} />
      <Toolbar />
      <div className={classes.body}>
        <SideBar open={sideBarOpen} handleClose={handleSideBarClose} />
        <main className={classes.content}>{children}</main>
      </div>
    </div>
  );
};

export default DefaultLayout;
