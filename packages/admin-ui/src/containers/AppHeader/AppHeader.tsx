import {
  AppBar,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';

import CmsBranding from '../../components/CmsBranding/CmsBranding';
import LanguagePicker from '../LanguagePicker/LanguagePicker';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { AppHeaderProps } from './AppHeader.props';
import useStyles from './AppHeader.styles';

const AppHeader: React.FC<AppHeaderProps> = ({ handleSideBarOpen }) => {
  const classes = useStyles();
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {isXs ? (
          <IconButton
            onClick={handleSideBarOpen}
            aria-label="toggle sidebar"
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <CmsBranding />
        )}
        <div className={classes.content}>
          <LanguagePicker />
          <ProfileMenu />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
