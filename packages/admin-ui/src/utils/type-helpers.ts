/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorResult } from '../generated/gql-types';

const ErrorResultTypename: ErrorResult['__typename'] = 'ErrorResult';

const isObjectType = (value: any): value is { __typename: string } =>
  Boolean(value) && typeof value === 'object' && '__typename' in value;

export const isErrorResult = (value: any): value is ErrorResult => {
  return isObjectType(value) && value.__typename === ErrorResultTypename;
};
