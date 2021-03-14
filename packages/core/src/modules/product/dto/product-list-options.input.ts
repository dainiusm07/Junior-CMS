import { ArgsType, Field, InputType } from "@nestjs/graphql";
import { Type } from "class-transformer";

import { BaseFilterOptions } from "../../shared/dto/base-filter-options.input";
import { BaseSortOptions } from "../../shared/dto/base-sort-options";
import {
  FilterOptions,
  generateListOptions,
  SortOptions,
} from "../../shared/list-utils";
import { conditionOperatorsMixin } from "../../shared/mixins";
import {
  DateOperators,
  NumberOperators,
  StringOperators,
} from "../../shared/operators";
import { ProductEntity } from "../product.entity";

@InputType()
class ProductSortOptions
  extends BaseSortOptions
  implements SortOptions<ProductEntity> {}

@InputType()
export class ProductFilterOptions
  extends BaseFilterOptions
  implements FilterOptions<ProductEntity> {
  @Type(() => StringOperators)
  @Field(() => StringOperators, { nullable: true })
  name: StringOperators;

  @Type(() => StringOperators)
  @Field(() => StringOperators, { nullable: true })
  description: StringOperators;

  @Type(() => NumberOperators)
  @Field(() => NumberOperators, { nullable: true })
  price: NumberOperators;

  @Type(() => DateOperators)
  @Field(() => DateOperators, { nullable: true })
  deletedAt: DateOperators;
}

@InputType()
class ExtendedProductFilterOptions extends conditionOperatorsMixin(
  ProductFilterOptions
) {}

@ArgsType()
export class ProductListOptions extends generateListOptions(
  ExtendedProductFilterOptions,
  ProductSortOptions
) {}
