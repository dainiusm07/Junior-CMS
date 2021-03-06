import { Field, InputType } from "@nestjs/graphql";

import { Operators } from "../operators.enum";

@InputType()
export class DateOperator {
  @Field(() => Date, { nullable: true, name: Operators.$gte })
  $gte?: Date;

  @Field(() => Date, { nullable: true, name: Operators.$lte })
  $lte?: Date;
}
