import { Injectable } from "@nestjs/common";
import { Args, Resolver, Query, Mutation, Int } from "@nestjs/graphql";
import { Permission } from "../../common/permission.enum";

import { Allow, InputValidation } from "../../decorators";
import { RoleService } from "../role/role.service";
import { NewUserInput, UpdateUserInput, UserListOptions } from "./dto";
import {
  CreateUserResponse,
  UpdateUserResponse,
  UserListResponse,
  UserResponse,
} from "./responses";
import { UserService } from "./user.service";

@Resolver()
@Injectable()
@InputValidation()
export class UserResolver {
  constructor(
    private userService: UserService,
    private roleService: RoleService
  ) {}

  @Allow(Permission.ReadUser)
  @Query(() => UserResponse)
  user(
    @Args("id", { type: () => Int }) id: number
  ): Promise<typeof UserResponse> {
    return this.userService.findOneOrFail({ id });
  }

  @Allow(Permission.ReadUser)
  @Query(() => UserListResponse)
  async users(@Args() options: UserListOptions): Promise<UserListResponse> {
    return this.userService.findList(options);
  }

  @Allow(Permission.CreateUser)
  @Mutation(() => CreateUserResponse)
  async createUser(
    @Args("input")
    input: NewUserInput
  ): Promise<typeof CreateUserResponse> {
    const { roleId, ...user } = input;

    const role = this.roleService.getReference(roleId);

    return this.userService.insert({ ...user, role });
  }

  @Allow(Permission.UpdateUser)
  @Mutation(() => UpdateUserResponse)
  updateUser(
    @Args("id", { type: () => Int }) id: number,
    @Args("input") input: UpdateUserInput
  ): Promise<typeof UpdateUserResponse> {
    return this.userService.updateOne(id, input);
  }
}
