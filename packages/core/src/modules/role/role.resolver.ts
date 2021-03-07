import { Injectable } from "@nestjs/common";
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";

import { Allow, InputValidation } from "../../decorators";
import { Permission } from "../../common/permission.enum";
import { RoleEntity } from "./role.entity";
import { RoleService } from "./role.service";
import { NewRoleInput, RoleListOptions, UpdateRoleInput } from "./dto";
import {
  CreateRoleResponse,
  RoleListResponse,
  RoleResponse,
  UpdateRoleResponse,
} from "./responses";

@Resolver()
@Injectable()
@InputValidation()
export class RoleResolver {
  constructor(private roleService: RoleService) {}

  @Query(() => RoleListResponse)
  @Allow(Permission.ReadRoles)
  async roles(@Args() options: RoleListOptions): Promise<RoleListResponse> {
    return this.roleService.findList(options);
  }

  @Query(() => RoleResponse)
  @Allow(Permission.ReadRole)
  role(@Args("id") id: number): Promise<typeof RoleResponse> {
    return this.roleService.findOneOrFail(id);
  }

  @Mutation(() => CreateRoleResponse)
  @Allow(Permission.CreateRole)
  createRole(@Args("input") input: NewRoleInput): Promise<RoleEntity> {
    return this.roleService.insert(input);
  }

  @Mutation(() => UpdateRoleResponse)
  @Allow(Permission.UpdateRole)
  async updateRole(
    @Args("id") id: number,
    @Args("input") input: UpdateRoleInput
  ): Promise<typeof UpdateRoleResponse> {
    return this.roleService.updateOne(id, input);
  }
}
