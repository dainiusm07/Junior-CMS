import { useMutation } from '@apollo/client';
import i18next from 'i18next';
import { Dispatch } from 'redux';

import {
  UserLoginMutation,
  UserLoginMutationVariables,
} from '../../generated/gql-types';
import { USER_LOGIN_MUTATION } from '../../graphql/User.graphql';
import { setSnackbar } from '../../redux/Snackbar/Snackbar.actions';
import { loginUser } from '../../redux/User/User.actions';
import { isErrorResult } from '../../utils/type-helpers';

export const useUserLoginMutation = (dispatch: Dispatch) => {
  return useMutation<UserLoginMutation, UserLoginMutationVariables>(
    USER_LOGIN_MUTATION,
    {
      onCompleted: ({ userLogin }) => {
        if (!isErrorResult(userLogin)) {
          dispatch(loginUser(userLogin));
          dispatch(
            setSnackbar({ message: i18next.t('successfully-logged-in') }),
          );
        }
      },
    },
  );
};
