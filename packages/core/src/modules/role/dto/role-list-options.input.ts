import { ArgsType, Field, InputType } from "@nestjs/graphql";

import { BaseFilterOptions } from "../../shared/dto/base-filter-options.input";
import {
  conditionOperatorsMixin,
  FilterOptions,
  generateListOptions,
} from "../../shared/list-utils";
import { StringOperator } from "../../shared/operators";
import { RoleEntity } from "../role.entity";

@InputType()
class RoleFilterOptions
  extends BaseFilterOptions
  implements FilterOptions<RoleEntity> {
  @Field(() => StringOperator, { nullable: true })
  name: StringOperator;
}

@InputType()
class ExtendedRoleFilterOptions extends conditionOperatorsMixin(
  RoleFilterOptions
) {}

@ArgsType()
export class RoleListOptions extends generateListOptions(
  ExtendedRoleFilterOptions
) {}
