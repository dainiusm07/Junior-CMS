import { Injectable } from "@nestjs/common";
import { Args, Resolver, Query, Mutation } from "@nestjs/graphql";

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

  @Allow()
  @Query(() => UserResponse)
  user(@Args("id") id: number): Promise<typeof UserResponse> {
    return this.userService.findOneOrFail({ id });
  }

  @Query(() => UserListResponse)
  async users(@Args() options: UserListOptions): Promise<UserListResponse> {
    return this.userService.findList(options);
  }

  @Mutation(() => CreateUserResponse)
  async createUser(
    @Args("input")
    input: NewUserInput
  ): Promise<typeof CreateUserResponse> {
    const { roleId, ...user } = input;

    const role = this.roleService.getReference(roleId);

    return this.userService.insert({ ...user, role });
  }

  @Mutation(() => UpdateUserResponse)
  updateUser(
    @Args("id") id: number,
    @Args("input") input: UpdateUserInput
  ): Promise<typeof UpdateUserResponse> {
    return this.userService.updateOne(id, input);
  }
}
