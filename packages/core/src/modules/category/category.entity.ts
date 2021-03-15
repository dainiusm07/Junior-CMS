import { Cascade, Entity, OneToOne, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "../shared/base.entity";

@ObjectType("Category")
@Entity({ tableName: "categories" })
export class CategoryEntity extends BaseEntity {
  @Field(() => Date, { nullable: true })
  @Property({ nullable: true })
  deletedAt: Date | null;

  @Field()
  @Property()
  name: string;

  @Field()
  @Property({ index: true, unique: true })
  slug: string;

  @Field()
  @Property({ default: true })
  active: boolean;

  @OneToOne(() => CategoryEntity, undefined, {
    cascade: [Cascade.ALL],
    nullable: true,
    unique: false,
  })
  parent: CategoryEntity;
}
