import { createUnionType, ObjectType } from '@nestjs/graphql';

import { InputValidationError } from '../../common/errors/input-validation.error';
import { ResultError } from '../../common/errors/result.error';
import { generateListResponse } from '../shared/list-utils';
import { User } from './user.entity';

export const UserResponse = createUnionType({
  name: 'UserResponse',
  types: () => [User, ResultError],
});

export const UpdateUserResponse = createUnionType({
  name: 'UpdateUserResponse',
  types: () => [User, InputValidationError, ResultError],
});

export const CreateUserResponse = createUnionType({
  name: 'CreateUserResponse',
  types: () => [User, InputValidationError],
});

@ObjectType()
export class UserListResponse extends generateListResponse(User) {}
