import { Field, InputType } from "@nestjs/graphql";

import { Permission } from "../../../common/permission.enum";

@InputType()
export class UpdateRoleInput {
  @Field({ nullable: true })
  name: string;

  @Field(() => [Permission], { nullable: true })
  permissions: Permission[];
}
