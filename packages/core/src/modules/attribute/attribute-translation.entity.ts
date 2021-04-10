import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';

import { BaseTranslation } from '../shared/base-translation.entity';
import { Attribute } from './attribute.entity';

@ObjectType()
@Entity({ tableName: 'attribute_translations' })
export class AttributeTranslation extends BaseTranslation {
  @Field()
  @Property()
  name: string;

  @ManyToOne(() => Attribute, { primary: true })
  attribute: Attribute;
}
