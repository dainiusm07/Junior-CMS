import { Entity, Property, PrimaryKey } from '@mikro-orm/core';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity({ abstract: true })
@ObjectType({ isAbstract: true })
export abstract class BaseEntity {
  @Field(() => Int)
  @PrimaryKey()
  id: number;

  @Field(() => Date)
  @Property()
  createdAt: Date = new Date();

  @Field(() => Date)
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
