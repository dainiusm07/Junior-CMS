import { ArgsType, Field, InputType } from "@nestjs/graphql";

import { BaseFilterOptions } from "../../shared/dto/base-filter-options.input";
import { BaseSortOptions } from "../../shared/dto/base-sort-options";
import {
  conditionOperatorsMixin,
  FilterOptions,
  generateListOptions,
  SortOptions,
} from "../../shared/list-utils";
import { StringOperators } from "../../shared/operators";
import { UserEntity } from "../../user/user.entity";
import { RoleEntity } from "../role.entity";

@InputType()
class RoleSortOptions
  extends BaseSortOptions
  implements SortOptions<UserEntity> {}

@InputType()
class RoleFilterOptions
  extends BaseFilterOptions
  implements FilterOptions<RoleEntity> {
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
