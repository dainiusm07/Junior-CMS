import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';

import { BaseTranslation } from '../shared/base-translation';
import { Product } from './product.entity';

@ObjectType()
@Entity({ tableName: 'product_translations' })
export class ProductTranslation extends BaseTranslation {
  @Field()
  @Property()
  name: string;

  @Field()
  @Property({ index: true, unique: true })
  slug: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  description?: string;

  @ManyToOne(() => Product, { primary: true })
  product: Product;
}
