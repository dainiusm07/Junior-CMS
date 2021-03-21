import {
  Entity,
  Index,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { AttributeEntity } from '../attribute/attribute.entity';

@ObjectType('AttributeValue')
@Entity({ tableName: 'attributes_values' })
@Index<AttributeValueEntity>({ properties: ['value'] })
export class AttributeValueEntity {
  @Field(() => Int)
  @PrimaryKey()
  id: number;

  @Field()
  @Property()
  value: string;

  @ManyToOne(() => AttributeEntity)
  attribute: AttributeEntity;
}
