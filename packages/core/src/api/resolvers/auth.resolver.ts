import { NativeAuthInput } from "@junior-cms/common";
import { Injectable } from "@nestjs/common";
import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { UserEntity } from "../../entities/user/user.entity";

import { AuthService } from "../../service/services/auth.service";
import { Allow } from "../decorators/Allow";
import { CurrentUser } from "../decorators/CurrentUser";

@Resolver()
@Injectable()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query()
  @Allow()
  userProfile(@CurrentUser() currentUser: UserEntity) {
    return currentUser;
  }

  @Mutation()
  async userLogin(@Args("input") input: NativeAuthInput) {
    const user = await this.authService.validateUser(input);
    if (!user) {
      throw Error("Invalid user credentials");
    }

    this.authService.loginUser(user);

    return user;
  }

  @Mutation()
  async userLogout() {
    this.authService.logoutUser();
    return true;
  }
}
