import { CreateUserInput, MutationUpdateUserArgs } from "@junior-cms/common";
import { Injectable } from "@nestjs/common";
import { Args, Resolver, Query, Mutation } from "@nestjs/graphql";

import { Allow } from "../../decorators/Allow";
import { RoleService } from "../role/role.service";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Resolver()
@Injectable()
export class UserResolver {
  constructor(
    private userService: UserService,
    private roleService: RoleService
  ) {}

  @Query()
  @Allow()
  user(@Args("id") id: number): Promise<UserEntity | null> {
    return this.userService.findOneOrFail({ id });
  }

  @Query()
  users(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Mutation()
  async createUser(
    @Args("input") { roleId, ...user }: CreateUserInput
  ): Promise<UserEntity> {
    const role = await this.roleService.findOneOrFail({ id: roleId });

    return this.userService.insert({ ...user, role });
  }

  @Mutation()
  updateUser(
    @Args() { id, input }: MutationUpdateUserArgs
  ): Promise<UserEntity> {
    return this.userService.updateOne(id, input);
  }
}
