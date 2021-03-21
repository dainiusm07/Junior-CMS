import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AttributeValueEntity } from '../attribute-value/attribute-value.entity';

@ObjectType('Attribute')
@Entity({ tableName: 'attributes' })
export class AttributeEntity {
  @Field(() => Int)
  @PrimaryKey()
  id: number;

  @Field()
  @Property()
  name: string;

  @Field(() => [AttributeValueEntity])
  @OneToMany(() => AttributeValueEntity, 'attribute')
  values = new Collection<AttributeValueEntity>(this);
}
