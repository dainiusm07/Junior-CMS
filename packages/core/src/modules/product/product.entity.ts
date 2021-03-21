import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';

import { Category } from '../category/category.entity';
import { ProductVariant } from '../product-variant/product-variant.entity';
import { BaseEntity } from '../shared/base.entity';

@ObjectType()
@Entity({ tableName: 'products' })
export class Product extends BaseEntity {
  @Field(() => Date, { nullable: true })
  @Property({ type: Date, nullable: true })
  deletedAt: Date | null;

  @Field()
  @Property()
  name: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  description?: string;

  @ManyToOne(() => Category)
  category: Category;

  @Field(() => [ProductVariant])
  @OneToMany(() => ProductVariant, 'product')
  variants = new Collection<ProductVariant>(this);
}
