import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { AttributeValue } from '../attribute-value/attribute-value.entity';
import { Attribute } from '../attribute/attribute.entity';
import { Product } from '../product/product.entity';
import { BaseEntity } from '../shared/base.entity';

@ObjectType()
@Entity({ tableName: 'product_variants' })
export class ProductVariant extends BaseEntity {
  @Field(() => Date, { nullable: true })
  @Property({ type: Date, nullable: true })
  deletedAt: Date | null;

  @Field()
  @Property({ unique: true })
  sku: string;

  @Field(() => Int)
  @Property()
  price: number;

  @ManyToMany({
    entity: () => AttributeValue,
    joinColumn: 'product_variant_id',
    inverseJoinColumn: 'attribute_value_id',
    pivotTable: 'product_variants_attributes_values',
    owner: true,
  })
  attributesValues = new Collection<AttributeValue>(this);

  @Field(() => [Attribute])
  protected attributes: Attribute[];

  @ManyToOne(() => Product)
  product: Product;
}
