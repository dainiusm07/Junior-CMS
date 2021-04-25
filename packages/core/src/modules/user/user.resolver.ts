import { Injectable } from '@nestjs/common';
import { Args, Resolver, Query, Mutation, Int } from '@nestjs/graphql';
import { InputValidationError } from '../../common/errors/input-validation.error';

import { Permission } from '../../common/permission.enum';
import { Allow, CurrentUser } from '../../decorators';
import { InputValidationPipe } from '../../middleware';
import { AuthService } from '../auth/auth.service';
import { NewUserInput, UpdateUserInput, UserListOptions } from './dto';
import { UpdateUserProfileInput } from './dto/update-user-profile.input';
import {
  CreateUserResponse,
  UpdateUserProfileResponse,
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

  @Allow()
  @Mutation(() => UpdateUserProfileResponse)
  async updateUserProfile(
    @Args('input', InputValidationPipe) input: UpdateUserProfileInput,
    @CurrentUser() { id, password }: User,
  ) {
    const { currentPassword, ...restInput } = input;

    const passwordIsCorrect = await AuthService.validatePassword(
      currentPassword,
      password,
    );

    if (!passwordIsCorrect) {
      throw InputValidationError.incorrectCurrentPassword();
    }

    return this.userService.updateOne(id, restInput);
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
