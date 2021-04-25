import { Field, InputType, Int } from '@nestjs/graphql';

import { Category } from '../../category/category.entity';
import { Exists, Unique } from '../../shared/constraints';
import { ProductTranslation } from '../product-translation.entity';
import { Product } from '../product.entity';

@InputType()
export class NewProductInput implements Partial<Product> {
  @Field()
  name: string;

  @Unique(ProductTranslation, 'slug')
  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  description?: string;

  @Exists(Category, 'id')
  @Field(() => Int)
  categoryId: number;
}
