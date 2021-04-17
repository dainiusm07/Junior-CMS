import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useUserProfileQuery } from './App.hooks';
import useStyles from './App.styles';
import Center from './components/Center/Center';
import LoginForm from './containers/LoginForm/LoginForm';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import { currentUserSelector } from './redux/User/User.selectors';
import routes from './routes';

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
    if (showLoadingIndicator || !user) {
      return (
        <Center>
          {showLoadingIndicator ? (
            <CircularProgress size={65} />
          ) : (
            <LoginForm />
          )}
        </Center>
      );
    }

    return (
      <DefaultLayout>
        <Switch>
          {routes.map(({ path, ...route }) => (
            <Route exact {...route} key={path} path={path} />
          ))}
          <Redirect to="/" />
        </Switch>
      </DefaultLayout>
    );
  };

  return (
    <div className={classes.root}>
      <Router>{getContent()}</Router>
    </div>
  );
};

export default App;