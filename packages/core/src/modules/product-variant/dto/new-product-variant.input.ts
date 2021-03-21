import { Field, InputType, Int } from '@nestjs/graphql';

import { PartialEntity } from '../../../types';
import { AttributeValueEntity } from '../../attribute-value/attribute-value.entity';
import { ProductEntity } from '../../product/product.entity';
import { Exists } from '../../shared/constraints/exists.constraint';
import { Unique } from '../../shared/constraints/unique.constraint';
import { ProductVariantEntity } from '../product-variant.entity';

@InputType()
export class NewProductVariantInput
  implements PartialEntity<ProductVariantEntity> {
  @Exists(ProductEntity, 'id', 'Product')
  @Field(() => Int)
  productId: number;

  @Field(() => Int)
  price: number;

  @Unique(ProductVariantEntity, 'slug')
  @Field()
  slug: string;

  @Exists(AttributeValueEntity, 'id', 'AttributeValue')
  @Field(() => [Int])
  attributesValuesIds: number[];
}
