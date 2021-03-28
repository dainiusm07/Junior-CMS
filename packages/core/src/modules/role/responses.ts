import { createUnionType, ObjectType } from '@nestjs/graphql';

import { InputValidationError } from '../../common/errors/input-validation.error';
import { ErrorResult } from '../../common/errors/error-result.error';
import { generateListResponse } from '../shared/list-utils';
import { Role } from './role.entity';

export const RoleResponse = createUnionType({
  name: 'RoleResponse',
  types: () => [Role, ErrorResult],
});

export const UpdateRoleResponse = createUnionType({
  name: 'UpdateRoleResponse',
  types: () => [Role, InputValidationError, ErrorResult],
});

export const CreateRoleResponse = createUnionType({
  name: 'CreateRoleResponse',
  types: () => [Role, InputValidationError],
});

@ObjectType()
export class RoleListResponse extends generateListResponse(Role) {}
