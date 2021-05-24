import { Toolbar, useMediaQuery, useTheme } from '@material-ui/core';
import React, { useState } from 'react';

import AppHeader from '../../containers/AppHeader/AppHeader';
import CmsBreadcrumbs from '../../containers/CmsBreadcrumbs/CmsBreadcrumbs';
import CmsSnackBar from '../../containers/CmsSnackBar/CmsSnackBar';
import SideBar from '../../containers/SideBar/SideBar';
import useStyles from './DefaultLayout.styles';

const DefaultLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));

  const snackbarAnchor = {
    horizontal: isXsDown ? 'center' : 'right',
    vertical: 'top',
  } as const;

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
      <CmsSnackBar anchorOrigin={snackbarAnchor} className={classes.snackbar} />
      <div className={classes.body}>
        <SideBar open={sideBarOpen} handleClose={handleSideBarClose} />
        <main className={classes.content}>{children}</main>
      </div>
    </div>
  );
};

export default DefaultLayout;
