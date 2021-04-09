import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
} from '@mikro-orm/core';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { LanguageCode } from '../../i18n/language-code.enum';
import { Translation } from '../../types/Translations';

import { Attribute } from '../attribute/attribute.entity';
import { BaseEntity } from '../shared/base.entity';
import { AttributeValueTranslation } from './attribute-value-translation.entity';

@ObjectType()
@Entity({ tableName: 'attributes_values' })
export class AttributeValue
  extends BaseEntity
  implements Translation<AttributeValueTranslation> {
  @Field(() => Int)
  @PrimaryKey()
  id: number;

  @ManyToOne(() => Attribute)
  attribute: Attribute;

  @OneToMany(() => AttributeValueTranslation, 'attributeValue', { eager: true })
  translations = new Collection<AttributeValueTranslation>(this);

  // Translation properties
  @Field(() => LanguageCode)
  languageCode?: LanguageCode;

  @Field()
  value?: string;
}
