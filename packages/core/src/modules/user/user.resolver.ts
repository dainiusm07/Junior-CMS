import { Injectable, UseFilters } from "@nestjs/common";
import {
  Args,
  Resolver,
  Query,
  Mutation,
  createUnionType,
} from "@nestjs/graphql";

import { InputValidationError } from "../../common/errors/input-validation.error";
import { Allow } from "../../decorators";
import { RoleService } from "../role/role.service";
import { NewUserInput } from "./dto/new-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

const UserMutationResponse = createUnionType({
  name: "UserMutationResponse",
  types: () => [UserEntity, InputValidationError],
});
@Resolver()
@Injectable()
export class UserResolver {
  constructor(
    private userService: UserService,
    private roleService: RoleService
  ) {}

  @Allow()
  @Query(() => UserEntity)
  user(@Args("id") id: number): Promise<UserEntity | null> {
    return this.userService.findOneOrFail({ id });
  }

  @Query(() => [UserMutationResponse])
  users() {
    return this.userService.findAll();
  }

  @Mutation(() => UserMutationResponse)
  async createUser(
    @Args("input")
    input: NewUserInput
  ): Promise<typeof UserMutationResponse> {
    const { roleId, ...user } = input;

    const role = this.roleService.getReference(roleId);

    return this.userService.insert({ ...user, role });
  }

  @Mutation(() => UserMutationResponse)
  updateUser(
    @Args("id") id: number,
    @Args("input") input: UpdateUserInput
  ): Promise<UserEntity> {
    return this.userService.updateOne(id, input);
  }
}
