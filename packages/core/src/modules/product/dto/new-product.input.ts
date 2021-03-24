import { Field, InputType, Int } from '@nestjs/graphql';
import { LanguageCode } from '../../../config/i18n/LanguageCode';

import { Category } from '../../category/category.entity';
import { Exists } from '../../shared/constraints/exists.constraint';
import { Product } from '../product.entity';

@InputType()
export class NewProductInput implements Partial<Product> {
  @Field(() => LanguageCode)
  languageCode: LanguageCode;

  @Field()
  name: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  description?: string;

  @Exists(Category, 'id', 'Category')
  @Field(() => Int)
  categoryId: number;
}
