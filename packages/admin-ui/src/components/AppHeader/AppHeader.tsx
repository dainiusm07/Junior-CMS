import { AppBar, Toolbar, useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';

import ProfileMenu from '../../containers/ProfileMenu/ProfileMenu';
import CmsBranding from '../CmsBranding/CmsBranding';
import useStyles from './AppHeader.styles';

const AppHeader: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {!isXs && <CmsBranding />}
        <div className={classes.content}>
          <ProfileMenu />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
