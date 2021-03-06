import { Field, InputType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { BaseEntity } from "../base.entity";
import { FilterOptions } from "../list-utils";
import { DateOperators, NumberOperators } from "../operators";

@InputType({ isAbstract: true })
export abstract class BaseFilterOptions implements FilterOptions<BaseEntity> {
  @Type(() => NumberOperators)
  @Field(() => NumberOperators, { nullable: true })
  id?: NumberOperators;

  @Type(() => DateOperators)
  @Field(() => DateOperators, { nullable: true })
  updatedAt?: DateOperators;

  @Type(() => DateOperators)
  @Field(() => DateOperators, { nullable: true })
  createdAt?: DateOperators;
}
