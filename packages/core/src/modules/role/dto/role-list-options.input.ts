import { ArgsType, Field, InputType } from '@nestjs/graphql';

import { BaseFilterOptions } from '../../shared/dto/base-filter-options.input';
import { BaseSortOptions } from '../../shared/dto/base-sort-options';
import {
  FilterOptions,
  generateListOptions,
  SortOptions,
} from '../../shared/list-utils';
import { conditionOperatorsMixin } from '../../shared/mixins';
import { StringOperators } from '../../shared/operators';
import { Role } from '../role.entity';

@InputType()
class RoleSortOptions extends BaseSortOptions implements SortOptions<Role> {}

@InputType()
class RoleFilterOptions
  extends BaseFilterOptions
  implements FilterOptions<Role> {
  @Field(() => StringOperators, { nullable: true })
  name: StringOperators;
}

@InputType()
class ExtendedRoleFilterOptions extends conditionOperatorsMixin(
  RoleFilterOptions,
) {}

@ArgsType()
export class RoleListOptions extends generateListOptions(
  ExtendedRoleFilterOptions,
  RoleSortOptions,
) {}
