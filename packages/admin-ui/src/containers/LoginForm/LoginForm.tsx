import { Card } from '@material-ui/core';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import FormError from '../../components/FormError/FormError';
import FormSubmitButton from '../../components/FormSubmitButton/FormSubmitButton';
import FormTextField from '../../components/FormTextField/FormTextField';
import FormTitle from '../../components/FormTitle/FormTitle';
import { NativeAuthInput } from '../../generated/gql-types';
import { isErrorResult } from '../../utils/type-helpers';
import { useUserLoginMutation } from './LoginForm.hooks';
import useStyles from './LoginForm.styles';

const LoginForm: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [login, { loading }] = useUserLoginMutation(dispatch);

  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (variables: NativeAuthInput) => {
    const response = await login({ variables });

    const result = response.data?.userLogin;

    if (isErrorResult(result)) {
      setErrorMessage(result.message);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Card className={classes.root}>
        <div>
          <FormTitle title="Log in" />

          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={handleLogin}
          >
            {({ values, handleSubmit, handleChange }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <FormTextField
                    label="Email"
                    id="email"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className={classes.formField}
                    fullWidth
                  />
                  <FormTextField
                    label="Password"
                    id="password"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    className={classes.formField}
                    fullWidth
                  />
                </div>

                {Boolean(errorMessage) && (
                  <div className={classes.formError}>
                    <FormError message={errorMessage} />
                  </div>
                )}

                <FormSubmitButton
                  className={classes.submitButton}
                  fullWidth
                  size="large"
                  loading={loading}
                >
                  Login
                </FormSubmitButton>
              </form>
            )}
          </Formik>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
