import { gql } from '@apollo/client';

export const INPUT_VALIDATION_ERROR_FIELDS = gql`
  fragment InputValidationErrorFields on InputValidationError {
    errors {
      messages
      path
    }
  }
`;

export const ERROR_RESULT_FIELDS = gql`
  fragment ErrorResultFields on ErrorResult {
    message
    errorCode
  }
`;
