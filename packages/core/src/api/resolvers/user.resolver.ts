import {
  CreateUserInput,
  Permission,
  UpdateUserInput,
} from "@junior-cms/common";
import { Injectable } from "@nestjs/common";
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";

import { Allow } from "../decorators/Allow";
import { UserEntity } from "../../entities/user/user.entity";
import { UserService } from "../../service";
import { CurrentUser } from "../decorators/CurrentUser";

@Resolver()
@Injectable()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query()
  @Allow(Permission.ReadUser)
  async user(@Args("id") id: number): Promise<UserEntity | undefined> {
    return this.userService.findOne({ where: { id } });
  }

  @Query()
  @Allow(Permission.ReadUsers)
  users(): Promise<UserEntity[]> {
    return this.userService.findMany();
  }

  @Mutation()
  @Allow(Permission.CreateUser)
  async createUser(
    @Args("input") input: CreateUserInput,
    @CurrentUser() currentUser: UserEntity
  ): Promise<UserEntity | undefined> {
    const { roleIds, ...restInput } = input;

    const user = await this.userService.create({ roles: [], ...restInput });

    await this.userService.assignRoles(roleIds, {
      assignedBy: currentUser.id,
      userId: user.id,
    });

    return this.userService.findOne({ where: { id: user.id } });
  }

  @Mutation()
  @Allow(Permission.UpdateUser)
  async updateUser(
    @Args("id") id: UserEntity["id"],
    @Args("input") input: UpdateUserInput,
    @CurrentUser() currentUser: UserEntity
  ): Promise<UserEntity | undefined> {
    const { roleIds, ...restInput } = input;

    const userUpdated = await this.userService.update(id, restInput);

    if (!userUpdated) {
      throw Error("No user");
    }

    await this.userService.assignRoles(roleIds, {
      assignedBy: currentUser.id,
      userId: id,
    });

    return this.userService.findOne({ where: { id } });
  }
}
