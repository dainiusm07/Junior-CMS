import { Injectable } from "@nestjs/common";
import { Resolver, Query, Mutation, Args, ObjectType } from "@nestjs/graphql";

import { Allow } from "../../decorators";
import { Permission } from "../../common/permission.enum";
import { NewRoleInput } from "./dto/new-role.input";
import { UpdateRoleInput } from "./dto/update-role.input";
import { RoleEntity } from "./role.entity";
import { RoleService } from "./role.service";
import { RoleListOptions } from "./dto/role-list-options.input";
import { generateListResponse } from "../shared/list-utils";

@ObjectType()
class RoleListResponse extends generateListResponse(RoleEntity) {}

@Resolver()
@Injectable()
export class RoleResolver {
  constructor(private roleService: RoleService) {}

  @Query(() => RoleListResponse)
  @Allow(Permission.ReadRoles)
  async roles(@Args() options: RoleListOptions): Promise<RoleListResponse> {
    return this.roleService.findList(options);
  }

  @Query(() => RoleEntity)
  @Allow(Permission.ReadRole)
  role(@Args("id") id: number): Promise<RoleEntity | null> {
    return this.roleService.findOne(id);
  }

  @Mutation(() => RoleEntity)
  @Allow(Permission.CreateRole)
  createRole(@Args("input") input: NewRoleInput): Promise<RoleEntity> {
    return this.roleService.insert(input);
  }

  @Mutation(() => RoleEntity)
  @Allow(Permission.UpdateRole)
  async updateRole(
    @Args("id") id: number,
    @Args("input") input: UpdateRoleInput
  ): Promise<RoleEntity> {
    return this.roleService.updateOne(id, input);
  }
}
