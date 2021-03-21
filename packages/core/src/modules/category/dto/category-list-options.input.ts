import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { BaseFilterOptions } from '../../shared/dto/base-filter-options.input';
import { BaseSortOptions } from '../../shared/dto/base-sort-options';
import {
  FilterOptions,
  generateListOptions,
  SortOptions,
} from '../../shared/list-utils';
import { conditionOperatorsMixin } from '../../shared/mixins';
import { DateOperators, StringOperators } from '../../shared/operators';
import { Category } from '../category.entity';

@InputType()
class CategorySortOptions
  extends BaseSortOptions
  implements SortOptions<Category> {}

@InputType()
export class CategoryFilterOptions
  extends BaseFilterOptions
  implements FilterOptions<Category> {
  @Type(() => DateOperators)
  @Field(() => DateOperators, { nullable: true })
  createdAt: DateOperators;

  @Type(() => StringOperators)
  @Field(() => StringOperators, { nullable: true })
  name: StringOperators;
}

@InputType()
class ExtendedCategoryFilterOptions extends conditionOperatorsMixin(
  CategoryFilterOptions,
) {}

@ArgsType()
export class CategoryListOptions extends generateListOptions(
  ExtendedCategoryFilterOptions,
  CategorySortOptions,
) {}
