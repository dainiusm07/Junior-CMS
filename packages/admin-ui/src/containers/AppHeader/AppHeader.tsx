import {
  AppBar,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CmsBranding from '../../components/CmsBranding/CmsBranding';
import { closeSideBar, openSideBar } from '../../redux/Ui/Ui.actions';
import { sideBarOpenedSelector } from '../../redux/Ui/Ui.selectors';
import LanguagePicker from '../LanguagePicker/LanguagePicker';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import useStyles from './AppHeader.styles';

const AppHeader: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const isXs = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });
  const isSideBarOpen = useSelector(sideBarOpenedSelector);

  const handleSideBarIconClick = () => {
    dispatch(isSideBarOpen ? closeSideBar() : openSideBar());
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {isXs ? (
          <IconButton
            onClick={handleSideBarIconClick}
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
