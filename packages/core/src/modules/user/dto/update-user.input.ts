import { Field, InputType, Int } from "@nestjs/graphql";

import { optionalProperties } from "../../../utils/optional-properties";
import { NewUserInput } from "./new-user.input";

@InputType()
export class UpdateUserInput extends optionalProperties(NewUserInput) {
  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field(() => Int, { nullable: true })
  roleId?: number;
}
