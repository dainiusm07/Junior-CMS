import { NativeAuthInput } from "@junior-cms/common";
import { Injectable } from "@nestjs/common";
import { Args, Mutation, Resolver, Query, Context } from "@nestjs/graphql";

import { AuthService } from "./auth.service";

@Resolver()
@Injectable()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query()
  userProfile(@Context() ctx: any) {
    return this.authService.getCurrentUser(ctx);
  }

  @Mutation()
  async userLogin(@Context() ctx: any, @Args("input") input: NativeAuthInput) {
    const user = await this.authService.validateUser(input);

    if (!user) {
      throw Error("Invalid user credentials");
    }

    this.authService.loginUser(ctx, user);
    return user;
  }

  @Mutation()
  async userLogout(@Context() ctx: any) {
    this.authService.logoutUser(ctx);
    return true;
  }
}
