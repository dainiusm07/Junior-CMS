import { useMutation } from '@apollo/client';
import { Dispatch } from 'redux';

import { UserLogoutMutation } from '../../../generated/gql-types';
import { USER_LOGOUT_MUTATION } from '../../../graphql/User.graphql';
import { logoutUser } from '../../../redux/User/User.actions';
import { UserLogoutAction } from '../../../redux/User/User.types';

export const useUserLogoutMutation = (dispatch: Dispatch<UserLogoutAction>) =>
  useMutation<UserLogoutMutation>(USER_LOGOUT_MUTATION, {
    onCompleted: ({ userLogout }) => {
      if (userLogout) {
        dispatch(logoutUser());
      }
    },
  });
