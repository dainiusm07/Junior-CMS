import { Field, InputType, Int } from '@nestjs/graphql';

import { PartialEntity } from '../../../types';
import { CategoryEntity } from '../../category/category.entity';
import { Exists } from '../../shared/constraints/exists.constraint';
import { ProductEntity } from '../product.entity';

@InputType()
export class NewProductInput implements PartialEntity<ProductEntity> {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Exists(CategoryEntity, "id", "Category")
  @Field(() => Int)
  categoryId: number;
}
