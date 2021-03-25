import { Field, InputType, Int } from '@nestjs/graphql';

import { PartialEntity } from '../../../types';
import { Exists } from '../../shared/constraints/exists.constraint';
import { Unique } from '../../shared/constraints/unique.constraint';
import { Category } from '../category.entity';

@InputType()
export class NewCategoryInput implements PartialEntity<Category> {
  @Field()
  name: string;

  @Unique(Category, 'slug')
  @Field({ nullable: true })
  slug?: string;

  @Exists(Category, 'id')
  @Field(() => Int, { nullable: true })
  parentId: number;
}
