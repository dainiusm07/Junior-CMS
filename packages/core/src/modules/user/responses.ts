import { createUnionType, ObjectType } from "@nestjs/graphql";

import { InputValidationError } from "../../common/errors/input-validation.error";
import { NotFoundError } from "../../common/errors/not-found.error";
import { generateListResponse } from "../shared/list-utils";
import { UserEntity } from "./user.entity";

export const UserResponse = createUnionType({
  name: "UserResponse",
  types: () => [UserEntity, NotFoundError],
});

export const UpdateUserResponse = createUnionType({
  name: "UpdateUserResponse",
  types: () => [UserEntity, InputValidationError, NotFoundError],
});

export const CreateUserResponse = createUnionType({
  name: "CreateUserResponse",
  types: () => [UserEntity, InputValidationError],
});

@ObjectType()
export class UserListResponse extends generateListResponse(UserEntity) {}
