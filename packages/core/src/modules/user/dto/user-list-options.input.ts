import { ArgsType, Field, InputType } from "@nestjs/graphql";

import { BaseFilterOptions } from "../../shared/dto/base-filter-options.input";
import {
  conditionOperatorsMixin,
  FilterOptions,
  generateListOptions,
} from "../../shared/list-utils";
import { DateOperator, StringOperator } from "../../shared/operators";
import { UserEntity } from "../user.entity";

@InputType()
export class UserFilterOptions
  extends BaseFilterOptions
  implements FilterOptions<UserEntity> {
  @Field(() => StringOperator, { nullable: true })
  email: StringOperator;

  @Field(() => StringOperator, { nullable: true })
  firstname: StringOperator;

  @Field(() => StringOperator, { nullable: true })
  lastname: StringOperator;

  @Field(() => DateOperator, { nullable: true })
  deletedAt: DateOperator;
}

@InputType()
class ExtendedUserFilterOptions extends conditionOperatorsMixin(
  UserFilterOptions
) {}

@ArgsType()
export class UserListOptions extends generateListOptions(
  ExtendedUserFilterOptions
) {}
