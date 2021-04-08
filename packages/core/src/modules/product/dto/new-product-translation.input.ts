import { Field, InputType, Int } from '@nestjs/graphql';

import { Exists } from '../../shared/constraints/exists.constraint';
import { Unique } from '../../shared/constraints/unique.constraint';
import { ProductTranslation } from '../product-translation.entity';
import { Product } from '../product.entity';

@InputType()
export class NewProductTranslationInput implements Partial<ProductTranslation> {
  @Field()
  name: string;

  @Unique(ProductTranslation, 'slug')
  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  description?: string;

  @Exists(Product, 'id')
  @Field(() => Int)
  productId: number;
}
