import { createUnionType, ObjectType } from '@nestjs/graphql';

import { InputValidationError } from '../../common/errors/input-validation.error';
import { NotFoundError } from '../../common/errors/not-found.error';
import { generateListResponse } from '../shared/list-utils';
import { RoleEntity } from './role.entity';

export const RoleResponse = createUnionType({
  name: 'RoleResponse',
  types: () => [RoleEntity, NotFoundError],
});

export const UpdateRoleResponse = createUnionType({
  name: 'UpdateRoleResponse',
  types: () => [RoleEntity, InputValidationError, NotFoundError],
});

export const CreateRoleResponse = createUnionType({
  name: 'CreateRoleResponse',
  types: () => [RoleEntity, InputValidationError],
});

@ObjectType()
export class RoleListResponse extends generateListResponse(RoleEntity) {}
