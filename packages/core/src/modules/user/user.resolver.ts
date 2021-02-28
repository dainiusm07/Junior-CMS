import {
  CreateUserInput,
  MutationCreateUserArgs,
  MutationUpdateUserArgs,
  UpdateUserInput,
  User,
} from "@junior-cms/common";
import { Injectable } from "@nestjs/common";
import { Args, Resolver, Query, Mutation } from "@nestjs/graphql";
import { Allow, Validate, ValidatedArg } from "../../decorators";

import { RoleService } from "../role/role.service";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";
import { createUserValidation } from "./validations/create-user.validation";
import { updateUserValidation } from "./validations/update-user.validation";

@Resolver()
@Injectable()
export class UserResolver {
  constructor(
    private userService: UserService,
    private roleService: RoleService
  ) {}

  @Query()
  @Allow()
  user(@Args("id") id: number): Promise<UserEntity | null> {
    return this.userService.findOneOrFail({ id });
  }

  @Query()
  users(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Mutation()
  @Validate<MutationCreateUserArgs>({
    input: createUserValidation,
  })
  async createUser(
    @ValidatedArg("input")
    input: CreateUserInput
  ): Promise<User> {
    const { roleId, ...user } = input;

    const role = this.roleService.getReference(roleId);

    return this.userService.insert({ ...user, role });
  }

  @Mutation()
  @Validate<MutationUpdateUserArgs>({
    input: updateUserValidation,
  })
  updateUser(
    @Args("id") id: number,
    @ValidatedArg("input") input: UpdateUserInput
  ): Promise<UserEntity> {
    return this.userService.updateOne(id, input);
  }
}
