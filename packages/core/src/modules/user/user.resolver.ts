import { Injectable } from '@nestjs/common';
import { Args, Resolver, Query, Mutation, Int } from '@nestjs/graphql';

import { Permission } from '../../common/permission.enum';
import { Allow } from '../../decorators';
import { InputValidationPipe } from '../../middleware';
import { NewUserInput, UpdateUserInput, UserListOptions } from './dto';
import {
  CreateUserResponse,
  UpdateUserResponse,
  UserListResponse,
  UserResponse,
} from './responses';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver()
@Injectable()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Allow(Permission.ReadUser)
  @Query(() => UserResponse)
  user(@Args('id', { type: () => Int }) id: number): Promise<User> {
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
    @Args('input', InputValidationPipe)
    input: NewUserInput,
  ): Promise<User> {
    const { roleId, ...user } = input;

    return this.userService.insert({ ...user, role: roleId });
  }

  @Allow(Permission.UpdateUser)
  @Mutation(() => UpdateUserResponse)
  updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('input', InputValidationPipe) input: UpdateUserInput,
  ): Promise<User> {
    const { roleId, ...restInput } = input;

    return this.userService.updateOne(id, { ...restInput, role: roleId });
  }
}
