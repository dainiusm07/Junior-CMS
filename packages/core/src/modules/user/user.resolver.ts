import { Injectable } from "@nestjs/common";
import {
  Args,
  Resolver,
  Query,
  Mutation,
  createUnionType,
  ObjectType,
} from "@nestjs/graphql";

import { InputValidationError } from "../../common/errors/input-validation.error";
import { Allow } from "../../decorators";
import { InputValidation } from "../../decorators/input-validation.decorator";
import { RoleService } from "../role/role.service";
import { generateListResponse } from "../shared/list-utils";
import { NewUserInput } from "./dto/new-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { UserListOptions } from "./dto/user-list-options.input";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

const UserMutationResponse = createUnionType({
  name: "UserMutationResponse",
  types: () => [UserEntity, InputValidationError],
});

@ObjectType()
class UserListResponse extends generateListResponse(UserEntity) {}

@Resolver()
@Injectable()
@InputValidation()
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

  @Query(() => UserListResponse)
  async users(@Args() options: UserListOptions): Promise<UserListResponse> {
    return this.userService.findList(options);
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
