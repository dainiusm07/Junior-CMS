import { NativeAuthInput } from "@generator";
import { Injectable } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "src/service/services/auth.service";

@Resolver()
@Injectable()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation()
  async loginUser(@Args("input") input: NativeAuthInput) {
    const user = await this.authService.validateUser(input);
    if (!user) {
      throw Error("Invalid user credentials");
    }

    this.authService.loginUser(user);

    return user;
  }

  @Mutation()
  async logoutUser() {
    this.authService.logoutUser();
    return true;
  }
}
