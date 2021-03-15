import { Field, InputType, Int } from "@nestjs/graphql";
import { MinLength } from "class-validator";

import { PartialEntity } from "../../../types";
import { RoleEntity } from "../../role/role.entity";
import { Email, NoWhiteSpace, Password } from "../../shared/constraints";
import { Exists } from "../../shared/constraints/exists.constraint";
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

  @Exists(RoleEntity, "id", "Role")
  @Field(() => Int)
  roleId: number;
}
