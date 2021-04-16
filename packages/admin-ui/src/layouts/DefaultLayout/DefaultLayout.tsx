import React from 'react';

import AppHeader from '../../components/AppHeader/AppHeader';
import SideBar from '../../containers/SideBar/SideBar';
import useStyles from './DefaultLayout.styles';

const DefaultLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppHeader />
      <div className={classes.body}>
        <SideBar />
        <main className={classes.content}>{children}</main>
      </div>
    </div>
  );
};

export default DefaultLayout;
