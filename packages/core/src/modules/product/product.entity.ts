import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property,
} from "@mikro-orm/core";
import { Field, Int, ObjectType } from "@nestjs/graphql";

import { AttributeValueEntity } from "../attribute-value/attribute-value.entity";
import { AttributeEntity } from "../attribute/attribute.entity";
import { CategoryEntity } from "../category/category.entity";
import { BaseEntity } from "../shared/base.entity";

@ObjectType("Product")
@Entity({ tableName: "products" })
export class ProductEntity extends BaseEntity {
  @Field(() => Date, { nullable: true })
  @Property({ nullable: true })
  deletedAt: Date | null;

  @Field()
  @Property()
  name: string;

  @Field()
  @Property({ index: true, unique: true })
  slug: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  description?: string;

  @Field(() => Int)
  @Property()
  price: number;

  @ManyToOne(() => CategoryEntity)
  category: CategoryEntity;

  @ManyToMany({
    entity: () => AttributeValueEntity,
    joinColumn: "product_id",
    inverseJoinColumn: "attribute_value_id",
    pivotTable: "products_attributes_values",
    owner: true,
  })
  attributesValues = new Collection<AttributeValueEntity>(this);

  @Field(() => [AttributeEntity])
  protected attributes: AttributeEntity[];
}
