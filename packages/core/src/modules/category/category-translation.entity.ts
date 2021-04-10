import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';

import { BaseTranslation } from '../shared/base-translation';
import { Category } from './category.entity';

@ObjectType()
@Entity({ tableName: 'category_translations' })
export class CategoryTranslation extends BaseTranslation {
  @Field()
  @Property()
  name: string;

  @Field()
  @Property({ index: true, unique: true })
  slug: string;

  @ManyToOne(() => Category, { primary: true })
  category: Category;
}
