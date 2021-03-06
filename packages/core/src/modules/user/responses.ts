import { createUnionType, ObjectType } from '@nestjs/graphql';

import { InputValidationError } from '../../common/errors/input-validation.error';
import { ErrorResult } from '../../common/errors/error-result.error';
import { generateListResponse } from '../shared/list-utils';
import { User } from './user.entity';

export const UserResponse = createUnionType({
  name: 'UserResponse',
  types: () => [User, ErrorResult],
});

export const UpdateUserResponse = createUnionType({
  name: 'UpdateUserResponse',
  types: () => [User, InputValidationError, ErrorResult],
});

export const UpdateUserProfileResponse = createUnionType({
  name: 'UpdateUserProfileResponse',
  types: () => [User, InputValidationError],
});

export const CreateUserResponse = createUnionType({
  name: 'CreateUserResponse',
  types: () => [User, InputValidationError],
});

@ObjectType()
export class UserListResponse extends generateListResponse(User) {}
