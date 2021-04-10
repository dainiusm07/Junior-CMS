import { Field, InputType, Int } from '@nestjs/graphql';

import { PartialEntity } from '../../../types';
import { Translated } from '../../../types/Translations';
import { Exists } from '../../shared/constraints/exists.constraint';
import { Unique } from '../../shared/constraints/unique.constraint';
import { CategoryTranslation } from '../category-translation.entity';
import { Category } from '../category.entity';

@InputType()
export class NewCategoryInput implements PartialEntity<Translated<Category>> {
  @Field()
  name: string;

  @Unique(CategoryTranslation, 'slug')
  @Field({ nullable: true })
  slug?: string;

  @Field()
  active: boolean;

  @Exists(Category, 'id')
  @Field(() => Int, { nullable: true })
  parentId: number;
}
