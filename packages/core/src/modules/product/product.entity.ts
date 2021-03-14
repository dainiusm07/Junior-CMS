import { Entity, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "@nestjs/graphql";
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

  @Field({ nullable: true })
  @Property({ nullable: true })
  description?: string;

  @Field(() => Int)
  @Property()
  price: number;
}
