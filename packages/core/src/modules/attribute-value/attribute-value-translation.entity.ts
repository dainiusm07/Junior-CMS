import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';

import { BaseTranslation } from '../shared/base-translation.entity';
import { AttributeValue } from './attribute-value.entity';

@ObjectType()
@Entity({ tableName: 'attribute_value_translations' })
export class AttributeValueTranslation extends BaseTranslation {
  @Field()
  @Property()
  value: string;

  @ManyToOne(() => AttributeValue, { primary: true })
  attributeValue: AttributeValue;
}
