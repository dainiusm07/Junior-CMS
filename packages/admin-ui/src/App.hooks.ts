import { useQuery } from '@apollo/client';
import { Dispatch } from 'redux';

import { UserProfileQuery } from './generated/gql-types';
import { USER_PROFILE_QUERY } from './graphql/User.graphql';
import { userProfileFetched } from './redux/data/User/User.actions';
import { UserProfileFetchedAction } from './redux/data/User/User.types';

export const useUserProfileQuery = (
  dispatch: Dispatch<UserProfileFetchedAction>,
) =>
  useQuery<UserProfileQuery>(USER_PROFILE_QUERY, {
    onCompleted: ({ userProfile }) => {
      if (userProfile) {
        dispatch(userProfileFetched(userProfile));
      }
    },
  });
