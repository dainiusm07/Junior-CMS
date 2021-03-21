import {
  Entity,
  Index,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Attribute } from '../attribute/attribute.entity';

@ObjectType()
@Entity({ tableName: 'attributes_values' })
@Index<AttributeValue>({ properties: ['value'] })
export class AttributeValue {
  @Field(() => Int)
  @PrimaryKey()
  id: number;

  @Field()
  @Property()
  value: string;

  @ManyToOne(() => Attribute)
  attribute: Attribute;
}
