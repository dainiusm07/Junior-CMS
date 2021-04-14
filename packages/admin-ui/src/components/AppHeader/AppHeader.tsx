import { AppBar, Button, Toolbar } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';

import { logoutUser } from '../../redux/data/User/User.actions';
import useStyles from './AppHeader.styles';

const AppHeader: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Button onClick={handleLogout}>LOGOUT</Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
