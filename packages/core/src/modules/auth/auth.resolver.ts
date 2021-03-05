import { Injectable } from "@nestjs/common";
import { Args, Mutation, Resolver, Query, Context } from "@nestjs/graphql";
import { UserEntity } from "../user/user.entity";

import { AuthService } from "./auth.service";
import { NativeAuthInput } from "./dto/native-auth.input";

@Resolver()
@Injectable()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => UserEntity)
  userProfile(@Context() ctx: any) {
    return this.authService.getCurrentUser(ctx);
  }

  @Mutation(() => UserEntity)
  async userLogin(@Context() ctx: any, @Args("input") input: NativeAuthInput) {
    const user = await this.authService.validateUser(input);

    if (!user) {
      throw Error("Invalid user credentials");
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
