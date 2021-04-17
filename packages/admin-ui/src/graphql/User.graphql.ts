import { gql } from '@apollo/client';

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
  }
`;

export const USER_LOGIN_MUTATION = gql`
  ${CORE_USER_FIELDS}
  mutation UserLogin($email: String!, $password: String!) {
    userLogin(input: { email: $email, password: $password }) {
      ...CoreUserFields

      ... on ErrorResult {
        message
        errorCode
      }
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
