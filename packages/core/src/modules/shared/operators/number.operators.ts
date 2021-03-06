import { Field, InputType } from "@nestjs/graphql";

import { Operators } from "../operators.enum";

@InputType()
export class NumberOperators {
  @Field({ nullable: true, name: Operators.$gt })
  $gt?: number;

  @Field({ nullable: true, name: Operators.$lt })
  $lt?: number;

  @Field({ nullable: true, name: Operators.$eq })
  $eq?: number;

  @Field(() => [Number], { nullable: true, name: Operators.$in })
  $in?: number[];

  @Field(() => [Number], { nullable: true, name: Operators.$nin })
  $nin?: number[];
}
