import { Injectable, UseFilters } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { Allow } from '../../decorators';
import { Permission } from '../../common/permission.enum';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { NewRoleInput, RoleListOptions, UpdateRoleInput } from './dto';
import {
  CreateRoleResponse,
  RoleListResponse,
  RoleResponse,
  UpdateRoleResponse,
} from './responses';
import { InputValidationPipe } from '../../middleware/input-validation.pipe';
import { InputValidationFilter, NotFoundFilter } from '../../filters';

@Resolver()
@Injectable()
@UseFilters(InputValidationFilter, NotFoundFilter)
export class RoleResolver {
  constructor(private roleService: RoleService) {}

  @Query(() => RoleListResponse)
  @Allow(Permission.ReadRole)
  async roles(@Args() options: RoleListOptions): Promise<RoleListResponse> {
    return this.roleService.findList(options);
  }

  @Query(() => RoleResponse)
  @Allow(Permission.ReadRole)
  role(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<typeof RoleResponse> {
    return this.roleService.findOneOrFail(id);
  }

  @Mutation(() => CreateRoleResponse)
  @Allow(Permission.CreateRole)
  createRole(
    @Args('input', InputValidationPipe) input: NewRoleInput,
  ): Promise<Role> {
    return this.roleService.insert(input);
  }

  @Mutation(() => UpdateRoleResponse)
  @Allow(Permission.UpdateRole)
  async updateRole(
    @Args('id', { type: () => Int }) id: number,
    @Args('input', InputValidationPipe) input: UpdateRoleInput,
  ): Promise<typeof UpdateRoleResponse> {
    return this.roleService.updateOne(id, input);
  }
}
