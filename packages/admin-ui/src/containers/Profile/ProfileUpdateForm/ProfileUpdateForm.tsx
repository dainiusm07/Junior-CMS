import { Grid } from '@material-ui/core';
import { Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import FormSubmitButton from '../../../components/FormSubmitButton/FormSubmitButton';
import FormTextField from '../../../components/FormTextField/FormTextField';
import { deleteFalsyValues } from '../../../utils/delete-falsy-values';
import { formikSubmit } from '../../../utils/formik-submit';
import { isInputValidationError } from '../../../utils/type-helpers';
import { useUpdateUserProfileMutation } from './ProfileUpdateForm.hooks';
import { ProfileUpdateFormProps } from './ProfileUpdateForm.props';
import {
  getProfileUpdateFormInitialValues,
  ProfileUpdateFormValues,
} from './ProfileUpdateForm.utils';

const ProfileUpdateForm: React.FC<ProfileUpdateFormProps> = ({
  user,
  ...props
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [updateProfile, { loading }] = useUpdateUserProfileMutation(dispatch);

  const initialFormValues = getProfileUpdateFormInitialValues(user);

  const handleProfileUpdate = formikSubmit<ProfileUpdateFormValues>(
    async (rawValues, { resetForm, setErrors, setFieldError }) => {
      const values = deleteFalsyValues(rawValues, [
        'password',
        'confirmPassword',
      ]);

      if (values.password && values.password !== values.confirmPassword) {
        return setFieldError(
          'confirmPassword',
          t('error.password-does-not-match'),
        );
      }

      delete values.confirmPassword;

      const { data } = await updateProfile({
        variables: { input: values },
      });

      if (!data) {
        return;
      }

      const { updateUserProfile: result } = data;

      if (isInputValidationError(result)) {
        setErrors(result.errors);
      } else {
        resetForm({ values: getProfileUpdateFormInitialValues(result) });
      }
    },
  );

  return (
    <div {...props}>
      <Formik initialValues={initialFormValues} onSubmit={handleProfileUpdate}>
        {({ values, handleSubmit, handleChange, errors }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} role="form-input">
                <FormTextField
                  label={t('firstname')}
                  id="firstname"
                  name="firstname"
                  type="text"
                  value={values.firstname}
                  error={Boolean(errors.firstname)}
                  errorMessage={errors.firstname}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} role="form-input">
                <FormTextField
                  label={t('lastname')}
                  id="lastname"
                  name="lastname"
                  type="text"
                  value={values.lastname}
                  error={Boolean(errors.lastname)}
                  errorMessage={errors.lastname}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} role="form-input">
                <FormTextField
                  label={t('new-password')}
                  id="password"
                  type="password"
                  name="password"
                  value={values.password}
                  error={Boolean(errors.password)}
                  errorMessage={errors.password}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} role="form-input">
                <FormTextField
                  label={t('confirm-password')}
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  error={Boolean(errors.confirmPassword)}
                  errorMessage={errors.confirmPassword}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} role="form-input">
                <FormTextField
                  label={t('email')}
                  disabled
                  id="email"
                  type="email"
                  name="email"
                  value={user.email}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} role="form-input">
                <FormTextField
                  label={t('current-password')}
                  id="currentPassword"
                  required
                  type="password"
                  name="currentPassword"
                  value={values.currentPassword}
                  error={Boolean(errors.currentPassword)}
                  errorMessage={errors.currentPassword}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <Grid container justify="flex-end">
                  <Grid item xs={12} sm={6} md={4} lg={2}>
                    <FormSubmitButton loading={loading} fullWidth>
                      {t('update')}
                    </FormSubmitButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileUpdateForm;
