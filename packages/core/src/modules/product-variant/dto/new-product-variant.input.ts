import { Field, InputType, Int } from '@nestjs/graphql';

import { PartialEntity } from '../../../types';
import { AttributeValue } from '../../attribute-value/attribute-value.entity';
import { Product } from '../../product/product.entity';
import { Exists } from '../../shared/constraints/exists.constraint';
import { Unique } from '../../shared/constraints/unique.constraint';
import { ProductVariant } from '../product-variant.entity';

@InputType()
export class NewProductVariantInput implements PartialEntity<ProductVariant> {
  @Exists(Product, 'id')
  @Field(() => Int)
  productId: number;

  @Field(() => Int)
  price: number;

  @Unique(ProductVariant, 'sku')
  @Field()
  sku: string;

  @Exists(AttributeValue, 'id')
  @Field(() => [Int])
  attributesValuesIds: number[];
}
