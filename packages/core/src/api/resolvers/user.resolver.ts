import { Permission } from "@generator";
import { Injectable } from "@nestjs/common";
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";

import { UserEntity } from "src/entities/user/user.entity";
import { UserService } from "src/service";
import { Allow } from "../decorators/Allow";

@Resolver()
@Injectable()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query()
  @Allow(Permission.ReadUser)
  user(id: number): Promise<UserEntity | undefined> {
    return this.userService.findOneById(id);
  }

  @Query()
  @Allow(Permission.ReadUsers)
  users(): Promise<UserEntity[]> {
    return this.userService.findMany();
  }

  @Mutation()
  @Allow(Permission.CreateUser)
  createUser(@Args("input") input: UserEntity): Promise<UserEntity> {
    return this.userService.create(input);
  }

  @Mutation()
  @Allow(Permission.UpdateUser)
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
