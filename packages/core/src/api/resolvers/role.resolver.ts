import {
  CreateRoleInput,
  Permission,
  UpdateRoleInput,
} from "@junior-cms/common";
import { Injectable } from "@nestjs/common";
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";

import { RoleEntity } from "../../entities/role/role.entity";
import { RoleService } from "../../service/services/role.service";
import { Allow } from "../decorators/Allow";

@Resolver()
@Injectable()
export class RoleResolver {
  constructor(private roleService: RoleService) {}

  @Query()
  @Allow(Permission.ReadRoles)
  async roles(): Promise<RoleEntity[]> {
    return this.roleService.findMany();
  }

  @Query()
  @Allow(Permission.ReadRole)
  role(id: RoleEntity["id"]) {
    return this.roleService.findOneById(id);
  }

  @Query()
  @Allow(Permission.CreateRole)
  permissions() {
    return this.roleService.getPermissions();
  }

  @Mutation()
  @Allow(Permission.CreateRole)
  createRole(@Args("input") input: CreateRoleInput) {
    return this.roleService.create({ description: null, ...input });
  }

  @Mutation()
  @Allow(Permission.UpdateRole)
  updateRole(
    @Args("id") id: RoleEntity["id"],
    @Args("input") input: UpdateRoleInput
  ) {
    return this.roleService.update(id, input);
  }
}
