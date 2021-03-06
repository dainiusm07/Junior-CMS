import { Field, InputType } from "@nestjs/graphql";

import { Operators } from "../operators.enum";

@InputType()
export class StringOperator {
  @Field({ nullable: true, name: Operators.$ilike })
  $ilike?: string;

  @Field({ nullable: true, name: Operators.$eq })
  $eq?: string;
}
