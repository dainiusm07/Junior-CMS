import { Field, InputType, Int } from '@nestjs/graphql';

import { Exists } from '../../shared/constraints/exists.constraint';
import { Unique } from '../../shared/constraints/unique.constraint';
import { CategoryTranslation } from '../category-translation.entity';
import { Category } from '../category.entity';

@InputType()
export class NewCategoryTranslationInput
  implements Partial<CategoryTranslation> {
  @Field()
  name: string;

  @Unique(CategoryTranslation, 'slug')
  @Field({ nullable: true })
  slug?: string;

  @Exists(Category, 'id')
  @Field(() => Int)
  categoryId: number;
}
