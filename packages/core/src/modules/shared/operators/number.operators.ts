import { Field, InputType } from "@nestjs/graphql";
import { Expose, Type } from "class-transformer";

import { Operators } from "../operators.enum";

@InputType()
export class NumberOperators {
  @Expose({ name: Operators.$gt })
  @Field({ nullable: true, name: Operators.$gt })
  $gt?: number;

  @Expose({ name: Operators.$gt })
  @Field({ nullable: true, name: Operators.$lt })
  $lt?: number;

  @Expose({ name: Operators.$eq })
  @Field({ nullable: true, name: Operators.$eq })
  $eq?: number;

  @Expose({ name: Operators.$in })
  @Field(() => [Number], { nullable: true, name: Operators.$in })
  $in?: number[];

  @Expose({ name: Operators.$nin })
  @Field(() => [Number], { nullable: true, name: Operators.$nin })
  $nin?: number[];
}
