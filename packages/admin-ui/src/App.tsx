import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useUserProfileQuery } from './App.hooks';
import useStyles from './App.styles';
import Center from './components/Center/Center';
import LoginForm from './containers/LoginForm/LoginForm';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { currentUserSelector } from './redux/User/User.selectors';

const App: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(true);

  const { data, error } = useUserProfileQuery(dispatch);
  const user = useSelector(currentUserSelector);

  // Prevents  LoginForm blinking on initial load
  useEffect(() => {
    if (user === data?.userProfile || error) {
      setShowLoadingIndicator(false);
    }
  }, [user, data, error]);

  const getContent = () => {
    if (showLoadingIndicator) {
      return (
        <Center>
          <CircularProgress size={65} />
        </Center>
      );
    }

    if (user) {
      return (
        <DefaultLayout>
          <Dashboard />
        </DefaultLayout>
      );
    } else {
      return (
        <Center>
          <LoginForm />
        </Center>
      );
    }
  };

  return <div className={classes.root}>{getContent()}</div>;
};

export default App;
