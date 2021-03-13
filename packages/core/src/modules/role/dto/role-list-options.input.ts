import { ArgsType, Field, InputType } from "@nestjs/graphql";
import { Type } from "class-transformer";

import { BaseFilterOptions } from "../../shared/dto/base-filter-options.input";
import { BaseSortOptions } from "../../shared/dto/base-sort-options";
import {
  conditionOperatorsMixin,
  FilterOptions,
  generateListOptions,
  SortOptions,
} from "../../shared/list-utils";
import { StringOperators } from "../../shared/operators";
import { RoleEntity } from "../role.entity";

@InputType()
class RoleSortOptions
  extends BaseSortOptions
  implements SortOptions<RoleEntity> {}

@InputType()
class RoleFilterOptions
  extends BaseFilterOptions
  implements FilterOptions<RoleEntity> {
  @Type(() => StringOperators)
  @Field(() => StringOperators, { nullable: true })
  name: StringOperators;
}

@InputType()
class ExtendedRoleFilterOptions extends conditionOperatorsMixin(
  RoleFilterOptions
) {}

@ArgsType()
export class RoleListOptions extends generateListOptions(
  ExtendedRoleFilterOptions,
  RoleSortOptions
) {}