import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';

import { CategoryEntity } from '../category/category.entity';
import { ProductVariantEntity } from '../product-variant/product-variant.entity';
import { BaseEntity } from '../shared/base.entity';

@ObjectType('Product')
@Entity({ tableName: 'products' })
export class ProductEntity extends BaseEntity {
  @Field(() => Date, { nullable: true })
  @Property({ type: Date, nullable: true })
  deletedAt: Date | null;

  @Field()
  @Property()
  name: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  description?: string;

  @ManyToOne(() => CategoryEntity)
  category: CategoryEntity;

  @Field(() => [ProductVariantEntity])
  @OneToMany(() => ProductVariantEntity, 'product')
  variants = new Collection<ProductVariantEntity>(this);
}
