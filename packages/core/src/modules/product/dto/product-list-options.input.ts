import { ArgsType, Field, InputType } from '@nestjs/graphql';

import { BaseFilterOptions } from '../../shared/dto/base-filter-options.input';
import { BaseSortOptions } from '../../shared/dto/base-sort-options';
import {
  FilterOptions,
  generateListOptions,
  SortOptions,
} from '../../shared/list-utils';
import { conditionOperatorsMixin } from '../../shared/mixins';
import {
  DateOperators,
  NumberOperators,
  StringOperators,
} from '../../shared/operators';
import { Product } from '../product.entity';

@InputType()
class ProductSortOptions
  extends BaseSortOptions
  implements SortOptions<Product> {}

@InputType()
export class ProductFilterOptions
  extends BaseFilterOptions
  implements FilterOptions<Product> {
  @Field(() => StringOperators, { nullable: true })
  name: StringOperators;

  @Field(() => StringOperators, { nullable: true })
  description: StringOperators;

  @Field(() => NumberOperators, { nullable: true })
  price: NumberOperators;

  @Field(() => DateOperators, { nullable: true })
  deletedAt: DateOperators;
}

@InputType()
class ExtendedProductFilterOptions extends conditionOperatorsMixin(
  ProductFilterOptions,
) {}

@ArgsType()
export class ProductListOptions extends generateListOptions(
  ExtendedProductFilterOptions,
  ProductSortOptions,
) {}
