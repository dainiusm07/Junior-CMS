import { Field, InputType, Int } from '@nestjs/graphql';

import { PartialEntity } from '../../../types';
import { Category } from '../../category/category.entity';
import { Exists } from '../../shared/constraints/exists.constraint';
import { Product } from '../product.entity';

@InputType()
export class NewProductInput implements PartialEntity<Product> {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Exists(Category, 'id', 'Category')
  @Field(() => Int)
  categoryId: number;
}
