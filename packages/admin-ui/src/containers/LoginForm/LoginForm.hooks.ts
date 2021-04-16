import { useMutation } from '@apollo/client';
import { Dispatch } from 'redux';

import {
  UserLoginMutation,
  UserLoginMutationVariables,
} from '../../generated/gql-types';
import { USER_LOGIN_MUTATION } from '../../graphql/User.graphql';
import { loginUser } from '../../redux/User/User.actions';
import { UserLoginAction } from '../../redux/User/User.types';
import { isErrorResult } from '../../utils/type-helpers';

export const useUserLoginMutation = (dispatch: Dispatch<UserLoginAction>) => {
  return useMutation<UserLoginMutation, UserLoginMutationVariables>(
    USER_LOGIN_MUTATION,
    {
      onCompleted: ({ userLogin }) => {
        if (!isErrorResult(userLogin)) {
          dispatch(loginUser(userLogin));
        }
      },
    },
  );
};
