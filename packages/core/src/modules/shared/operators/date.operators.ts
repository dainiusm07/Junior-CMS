import { Field, InputType } from "@nestjs/graphql";
import { Expose, Type } from "class-transformer";

import { Operators } from "../operators.enum";

@InputType()
export class DateOperators {
  @Expose({ name: Operators.$gte })
  @Type(() => Date)
  @Field(() => Date, { nullable: true, name: Operators.$gte })
  $gte?: Date;

  @Expose({ name: Operators.$lte })
  @Type(() => Date)
  @Field(() => Date, { nullable: true, name: Operators.$lte })
  $lte?: Date;
}
