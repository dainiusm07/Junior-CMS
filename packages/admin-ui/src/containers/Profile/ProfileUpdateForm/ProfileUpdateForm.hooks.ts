import { useMutation } from '@apollo/client';
import i18next from 'i18next';
import { Dispatch } from 'redux';

import {
  UpdateUserProfileMutation,
  UpdateUserProfileMutationVariables,
} from '../../../generated/gql-types';
import { UPDATE_USER_PROFILE_MUTATION } from '../../../graphql/User.graphql';
import { setSnackbar } from '../../../redux/Snackbar/Snackbar.actions';
import { updateUser } from '../../../redux/User/User.actions';
import { isInputValidationError } from '../../../utils/type-helpers';

export const useUpdateUserProfileMutation = (dispatch: Dispatch) =>
  useMutation<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>(
    UPDATE_USER_PROFILE_MUTATION,
    {
      onCompleted: ({ updateUserProfile }) => {
        if (!isInputValidationError(updateUserProfile)) {
          dispatch(updateUser(updateUserProfile));
          dispatch(
            setSnackbar({
              message: i18next.t('successfully-updated', {
                name: i18next.t('profile'),
              }),
            }),
          );
        }
      },
    },
  );
