import { gql } from '@apollo/client';

import {
  ERROR_RESULT_FIELDS,
  INPUT_VALIDATION_ERROR_FIELDS,
} from './Errors.graphql';

export const CORE_USER_FIELDS = gql`
  fragment CoreUserFields on User {
    id
    firstname
    lastname
    email
    role {
      name
      isAdmin
      permissions
    }
    createdAt
    updatedAt
  }
`;

export const USER_LOGIN_MUTATION = gql`
  ${CORE_USER_FIELDS}
  ${ERROR_RESULT_FIELDS}
  mutation UserLogin($email: String!, $password: String!) {
    userLogin(input: { email: $email, password: $password }) {
      ...CoreUserFields
      ...ErrorResultFields
    }
  }
`;

export const USER_LOGOUT_MUTATION = gql`
  mutation UserLogout {
    userLogout
  }
`;

export const USER_PROFILE_QUERY = gql`
  ${CORE_USER_FIELDS}
  query UserProfile {
    userProfile {
      ...CoreUserFields
    }
  }
`;

export const UPDATE_USER_PROFILE_MUTATION = gql`
  ${CORE_USER_FIELDS}
  ${INPUT_VALIDATION_ERROR_FIELDS}
  mutation UpdateUserProfile($input: UpdateUserProfileInput!) {
    updateUserProfile(input: $input) {
      ...CoreUserFields
      ...InputValidationErrorFields
    }
  }
`;
