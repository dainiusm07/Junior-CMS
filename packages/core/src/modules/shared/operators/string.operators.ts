import { Field, InputType } from "@nestjs/graphql";
import { Expose } from "class-transformer";

import { Operators } from "../operators.enum";

@InputType()
export class StringOperators {
  @Expose({ name: Operators.$ilike })
  @Field({ nullable: true, name: Operators.$ilike })
  $ilike?: string;

  @Expose({ name: Operators.$eq })
  @Field({ nullable: true, name: Operators.$eq })
  $eq?: string;
}
