import { Collection, Entity, ManyToMany, ManyToOne, Property } from '@mikro-orm/core';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { AttributeValueEntity } from '../attribute-value/attribute-value.entity';
import { AttributeEntity } from '../attribute/attribute.entity';
import { ProductEntity } from '../product/product.entity';
import { BaseEntity } from '../shared/base.entity';

@ObjectType("ProductVariant")
@Entity({ tableName: "product_variants" })
export class ProductVariantEntity extends BaseEntity {
  @Field(() => Date, { nullable: true })
  @Property({ type: Date, nullable: true })
  deletedAt: Date | null;

  @Field()
  @Property({ index: true, unique: true })
  slug: string;

  @Field(() => Int)
  @Property()
  price: number;

  @ManyToMany({
    entity: () => AttributeValueEntity,
    joinColumn: "product_variant_id",
    inverseJoinColumn: "attribute_value_id",
    pivotTable: "product_variants_attributes_values",
    owner: true,
  })
  attributesValues = new Collection<AttributeValueEntity>(this);

  @Field(() => [AttributeEntity])
  protected attributes: AttributeEntity[];

  @ManyToOne(() => ProductEntity)
  product: ProductEntity;
}
