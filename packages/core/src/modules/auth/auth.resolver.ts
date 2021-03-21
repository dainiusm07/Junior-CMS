import { Injectable } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { User } from '../user/user.entity';

import { AuthService } from './auth.service';
import { NativeAuthInput } from './dto';

@Resolver()
@Injectable()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => User, { nullable: true })
  userProfile(@Context() ctx: any): Promise<User | null> {
    return this.authService.getCurrentUser(ctx);
  }

  @Mutation(() => User, { nullable: true })
  async userLogin(
    @Context() ctx: any,
    @Args('input') input: NativeAuthInput,
  ): Promise<User | null> {
    const user = await this.authService.validateUser(input);

    if (!user) {
      return null;
    }

    this.authService.loginUser(ctx, user);
    return user;
  }

  @Mutation(() => Boolean)
  async userLogout(@Context() ctx: any) {
    this.authService.logoutUser(ctx);
    return true;
  }
}
