import { Injectable } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { ErrorResult } from '../../common/errors/error-result.error';
import { CmsContext } from '../../types/CmsContext';
import { User } from '../user/user.entity';

import { AuthService } from './auth.service';
import { NativeAuthInput } from './dto';
import { UserLoginResponse } from './responses';

@Resolver()
@Injectable()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => User, { nullable: true })
  userProfile(@Context() ctx: CmsContext): Promise<User | null> {
    return this.authService.getCurrentUser(ctx);
  }

  @Mutation(() => UserLoginResponse)
  async userLogin(
    @Context() ctx: CmsContext,
    @Args('input') input: NativeAuthInput,
  ): Promise<User> {
    const user = await this.authService.validateUser(input);

    if (!user) {
      throw ErrorResult.incorrectLoginCredentials(User);
    }

    this.authService.loginUser(ctx, user);
    return user;
  }

  @Mutation(() => Boolean)
  async userLogout(@Context() ctx: CmsContext) {
    this.authService.logoutUser(ctx);
    return true;
  }
}
