import { Field, InputType } from "@nestjs/graphql";
import { BaseEntity } from "../base.entity";
import { FilterOptions } from "../list-utils";
import { DateOperators, NumberOperators } from "../operators";

@InputType({ isAbstract: true })
export abstract class BaseFilterOptions implements FilterOptions<BaseEntity> {
  @Field(() => NumberOperators, { nullable: true })
  id?: NumberOperators;

  @Field(() => DateOperators, { nullable: true })
  updatedAt?: DateOperators;

  @Field(() => DateOperators, { nullable: true })
  createdAt?: DateOperators;
}
