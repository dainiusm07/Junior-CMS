import {
  Cascade,
  Collection,
  Entity,
  LoadStrategy,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';

import { LanguageCode } from '../../i18n/language-code.enum';
import { Translation } from '../../types/Translations';
import { BaseEntity } from '../shared/base.entity';
import { CategoryTranslation } from './category-translation.entity';

@ObjectType()
@Entity({ tableName: 'categories' })
export class Category
  extends BaseEntity
  implements Translation<CategoryTranslation> {
  @Field(() => Date, { nullable: true })
  @Property({ type: Date, nullable: true })
  deletedAt: Date | null;

  @Field()
  @Property({ default: true })
  active: boolean;

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, {
    cascade: [Cascade.ALL],
    nullable: true,
    unique: false,
  })
  parent: Category | null;

  @Field(() => [Category])
  @OneToMany(() => Category, 'parent', {
    strategy: LoadStrategy.SELECT_IN,
  })
  children = new Collection<Category>(this);

  @OneToMany(() => CategoryTranslation, 'category', { eager: true })
  translations = new Collection<CategoryTranslation>(this);

  // Translation properties
  @Field(() => LanguageCode)
  languageCode?: LanguageCode;

  @Field()
  name?: string;

  @Field()
  slug?: string;
}
