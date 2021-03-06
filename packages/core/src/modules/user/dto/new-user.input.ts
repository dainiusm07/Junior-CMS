import { Field, InputType, Int } from "@nestjs/graphql";
import { MinLength } from "class-validator";

import { PartialEntity } from "../../../types";
import { Email, NoWhiteSpace, Password } from "../../shared/constraints";
import { RoleId } from "../constraints/role-id.constraint";
import { UserEntity } from "../user.entity";

@InputType()
export class NewUserInput implements PartialEntity<UserEntity> {
  @MinLength(3)
  @NoWhiteSpace()
  @Field()
  firstname: string;

  @MinLength(3)
  @NoWhiteSpace()
  @Field()
  lastname: string;

  @Email(UserEntity)
  @Field()
  email: string;

  @Password()
  @Field()
  password: string;

  @RoleId()
  @Field(() => Int)
  roleId: number;
}
