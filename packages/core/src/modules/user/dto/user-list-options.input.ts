import { ArgsType, Field, InputType } from '@nestjs/graphql';

import { BaseFilterOptions } from '../../shared/dto/base-filter-options.input';
import { BaseSortOptions } from '../../shared/dto/base-sort-options';
import {
  FilterOptions,
  generateListOptions,
  SortOptions,
  SortOrder,
} from '../../shared/list-utils';
import { conditionOperatorsMixin } from '../../shared/mixins';
import { DateOperators, StringOperators } from '../../shared/operators';
import { UserEntity } from '../user.entity';

@InputType()
class UserSortOptions
  extends BaseSortOptions
  implements SortOptions<UserEntity> {
  @Field(() => SortOrder, { nullable: true })
  email?: SortOrder;
}

@InputType()
export class UserFilterOptions
  extends BaseFilterOptions
  implements FilterOptions<UserEntity> {
  @Field(() => StringOperators, { nullable: true })
  email: StringOperators;

  @Field(() => StringOperators, { nullable: true })
  firstname: StringOperators;

  @Field(() => StringOperators, { nullable: true })
  lastname: StringOperators;

  @Field(() => DateOperators, { nullable: true })
  deletedAt: DateOperators;
}

@InputType()
class ExtendedUserFilterOptions extends conditionOperatorsMixin(
  UserFilterOptions,
) {}

@ArgsType()
export class UserListOptions extends generateListOptions(
  ExtendedUserFilterOptions,
  UserSortOptions,
) {}
