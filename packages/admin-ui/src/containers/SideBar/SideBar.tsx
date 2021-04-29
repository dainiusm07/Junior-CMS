import { Drawer, IconButton, useMediaQuery, useTheme } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import React from 'react';

import { SideBarProps } from './SideBar.props';
import useStyles from './SideBar.styles';
import SideBarContent from './SideBarContent/SideBarContent';

const SideBar: React.FC<SideBarProps> = ({ open, handleClose }) => {
  const classes = useStyles();
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });

  return (
    <Drawer
      variant={isXs ? 'temporary' : 'permanent'}
      open={open}
      elevation={2}
      onClose={handleClose}
      className={classes.drawer}
      ModalProps={{
        keepMounted: true,
      }}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      {isXs && (
        <div className={classes.drawerHeader}>
          <IconButton color="inherit" onClick={handleClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
      )}

      <SideBarContent onItemClick={handleClose} />
    </Drawer>
  );
};

export default SideBar;
