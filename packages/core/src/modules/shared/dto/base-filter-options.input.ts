import { Field, InputType } from "@nestjs/graphql";
import { BaseEntity } from "../base.entity";
import { FilterOptions } from "../list-utils";
import { DateOperator, NumberOperator } from "../operators";

@InputType({ isAbstract: true })
export abstract class BaseFilterOptions implements FilterOptions<BaseEntity> {
  @Field(() => NumberOperator, { nullable: true })
  id?: NumberOperator;

  @Field(() => DateOperator, { nullable: true })
  updatedAt?: DateOperator;

  @Field(() => DateOperator, { nullable: true })
  createdAt?: DateOperator;
}
