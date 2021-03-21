import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AttributeValue } from '../attribute-value/attribute-value.entity';

@ObjectType()
@Entity({ tableName: 'attributes' })
export class Attribute {
  @Field(() => Int)
  @PrimaryKey()
  id: number;

  @Field()
  @Property()
  name: string;

  @Field(() => [AttributeValue])
  @OneToMany(() => AttributeValue, 'attribute')
  values = new Collection<AttributeValue>(this);
}
