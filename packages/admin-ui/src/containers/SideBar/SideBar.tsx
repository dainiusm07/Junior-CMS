import { Drawer, useMediaQuery, useTheme } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeSideBar, openSideBar } from '../../redux/Ui/Ui.actions';
import { sideBarOpenedSelector } from '../../redux/Ui/Ui.selectors';
import { SideBarProps } from './SideBar.props';
import useStyles from './SideBar.styles';
import SideBarContent from './SideBarContent/SideBarContent';

const SideBar: React.FC<SideBarProps> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });
  const isSideBarOpen = useSelector(sideBarOpenedSelector);

  useEffect(() => {
    if (isXs) {
      dispatch(openSideBar());
    }
  }, []);

  const handleSideBarClose = () => {
    dispatch(closeSideBar());
  };

  return (
    <Drawer
      variant={isXs ? 'temporary' : 'permanent'}
      open={isSideBarOpen}
      elevation={2}
      onClose={handleSideBarClose}
      className={classes.drawer}
      ModalProps={{
        disablePortal: true,
        keepMounted: true,
        BackdropProps: {
          className: classes.backdrop,
        },
      }}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <SideBarContent />
    </Drawer>
  );
};

export default SideBar;
