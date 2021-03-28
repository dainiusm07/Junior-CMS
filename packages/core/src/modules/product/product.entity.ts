import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { LanguageCode } from '../i18n/language-code.enum';
import { Translation } from '../../types/Translations';

import { Category } from '../category/category.entity';
import { ProductVariant } from '../product-variant/product-variant.entity';
import { BaseEntity } from '../shared/base.entity';
import { ProductTranslation } from './product-translation.entity';

@ObjectType()
@Entity({ tableName: 'products' })
export class Product
  extends BaseEntity
  implements Translation<ProductTranslation> {
  @Field(() => Date, { nullable: true })
  @Property({ type: Date, nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Category)
  category: Category;

  @Field(() => [ProductVariant])
  @OneToMany(() => ProductVariant, 'product')
  variants = new Collection<ProductVariant>(this);

  @Field(() => ProductTranslation)
  @OneToMany(() => ProductTranslation, 'product', {
    eager: true,
  })
  translations = new Collection<ProductTranslation>(this);

  // Translation properties
  @Field(() => LanguageCode)
  languageCode?: LanguageCode;

  @Field()
  name?: string;

  @Field()
  slug?: string;

  @Field({ nullable: true })
  description?: string;
}
