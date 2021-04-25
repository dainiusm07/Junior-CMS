/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ErrorResult,
  InputValidationError,
  InputValidationErrorFieldsFragment,
} from '../generated/gql-types';

const ErrorResultTypename: ErrorResult['__typename'] = 'ErrorResult';
const InputValidationErrorTypename: InputValidationError['__typename'] =
  'InputValidationError';

const isObjectType = (value: any): value is { __typename: string } =>
  Boolean(value) && typeof value === 'object' && '__typename' in value;

export const isErrorResult = (value: any): value is ErrorResult => {
  return isObjectType(value) && value.__typename === ErrorResultTypename;
};

export const isInputValidationError = (
  value: any,
): value is InputValidationErrorFieldsFragment => {
  return (
    isObjectType(value) && value.__typename === InputValidationErrorTypename
  );
};
