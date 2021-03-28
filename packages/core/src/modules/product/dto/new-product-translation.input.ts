import { Field, InputType } from '@nestjs/graphql';

import { Exists } from '../../shared/constraints/exists.constraint';
import { Unique } from '../../shared/constraints/unique.constraint';
import { LanguageCode } from '../../i18n/language-code.enum';
import { ProductTranslation } from '../product-translation.entity';
import { Product } from '../product.entity';

@InputType()
export class NewProductTranslationInput implements Partial<ProductTranslation> {
  @Field(() => LanguageCode)
  languageCode: LanguageCode;

  @Field()
  name: string;

  @Unique(ProductTranslation, 'slug')
  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  description?: string;

  @Exists(Product, 'id')
  @Field()
  productId: number;
}
