import { Drawer, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeSideBar } from '../../redux/Ui/Ui.actions';
import { sideBarOpenedSelector } from '../../redux/Ui/Ui.selectors';
import { SideBarProps } from './SideBar.props';
import useStyles from './SideBar.styles';

const SideBar: React.FC<SideBarProps> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });
  const isSideBarOpen = useSelector(sideBarOpenedSelector);

  const handleSideBarClose = () => {
    dispatch(closeSideBar());
  };

  return (
    <Drawer
      variant={isXs ? 'temporary' : 'permanent'}
      open={isSideBarOpen}
      elevation={3}
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
      <Typography>SideBar</Typography>
    </Drawer>
  );
};

export default SideBar;
