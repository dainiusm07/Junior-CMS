import { createUnionType, ObjectType } from '@nestjs/graphql';

import { InputValidationError } from '../../common/errors/input-validation.error';
import { ResultError } from '../../common/errors/result.error';
import { generateListResponse } from '../shared/list-utils';
import { Role } from './role.entity';

export const RoleResponse = createUnionType({
  name: 'RoleResponse',
  types: () => [Role, ResultError],
});

export const UpdateRoleResponse = createUnionType({
  name: 'UpdateRoleResponse',
  types: () => [Role, InputValidationError, ResultError],
});

export const CreateRoleResponse = createUnionType({
  name: 'CreateRoleResponse',
  types: () => [Role, InputValidationError],
});

@ObjectType()
export class RoleListResponse extends generateListResponse(Role) {}
