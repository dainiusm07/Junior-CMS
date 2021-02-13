import { Injectable } from "@nestjs/common";
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";

import { UserEntity } from "src/entities/user/user.entity";
import { UserService } from "src/service";

@Resolver()
@Injectable()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query()
  user(id: number): Promise<UserEntity | undefined> {
    return this.userService.findOneById(id);
  }

  @Query()
  users(): Promise<UserEntity[]> {
    return this.userService.findMany();
  }

  @Mutation()
  createUser(@Args("input") input: UserEntity): Promise<UserEntity> {
    return this.userService.create(input);
  }

  @Mutation()
  async updateUser(
    @Args("id") id: UserEntity["id"],
    @Args("input") input: Partial<UserEntity>
  ): Promise<UserEntity> {
    const user = await this.userService.update(id, input);
    if (!user) {
      throw Error("No user");
    }
    return user;
  }
}
