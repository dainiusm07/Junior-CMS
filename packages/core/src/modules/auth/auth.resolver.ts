import { Injectable } from "@nestjs/common";
import { Args, Mutation, Resolver, Query, Context } from "@nestjs/graphql";
import { UserEntity } from "../user/user.entity";

import { AuthService } from "./auth.service";
import { NativeAuthInput } from "./dto";

@Resolver()
@Injectable()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => UserEntity, { nullable: true })
  userProfile(@Context() ctx: any): Promise<UserEntity | null> {
    return this.authService.getCurrentUser(ctx);
  }

  @Mutation(() => UserEntity, { nullable: true })
  async userLogin(
    @Context() ctx: any,
    @Args("input") input: NativeAuthInput
  ): Promise<UserEntity | null> {
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
