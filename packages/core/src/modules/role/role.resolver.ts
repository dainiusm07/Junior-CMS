import {
  CreateRoleInput,
  Permission,
  UpdateRoleInput,
} from "@junior-cms/common";
import { Injectable } from "@nestjs/common";
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";

import { Allow } from "../../decorators/Allow";
import { RoleEntity } from "./role.entity";
import { RoleService } from "./role.service";

@Resolver()
@Injectable()
export class RoleResolver {
  constructor(private roleService: RoleService) {}

  @Query()
  @Allow(Permission.ReadRoles)
  async roles(): Promise<RoleEntity[]> {
    return this.roleService.findAll();
  }

  @Query()
  @Allow(Permission.ReadRole)
  role(@Args("id") id: RoleEntity["id"]): Promise<RoleEntity | null> {
    return this.roleService.findOne(id);
  }

  @Mutation()
  @Allow(Permission.CreateRole)
  createRole(@Args("input") input: CreateRoleInput): Promise<RoleEntity> {
    return this.roleService.insert(input);
  }

  @Mutation()
  @Allow(Permission.UpdateRole)
  async updateRole(
    @Args("id") id: RoleEntity["id"],
    @Args("input") input: UpdateRoleInput
  ): Promise<RoleEntity> {
    return this.roleService.updateOne(id, input);
  }
}
