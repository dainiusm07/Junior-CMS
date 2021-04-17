import { LanguageCode } from '@junior-cms/common';
import { Collection, Entity, OneToMany, PrimaryKey } from '@mikro-orm/core';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Translation } from '../../types/Translations';
import { AttributeValue } from '../attribute-value/attribute-value.entity';
import { BaseEntity } from '../shared/base.entity';
import { AttributeTranslation } from './attribute-translation.entity';

@ObjectType()
@Entity({ tableName: 'attributes' })
export class Attribute
  extends BaseEntity
  implements Translation<AttributeTranslation> {
  @Field(() => Int)
  @PrimaryKey()
  id: number;

  @OneToMany(() => AttributeTranslation, 'attribute', { eager: true })
  translations = new Collection<AttributeTranslation>(this);

  @Field(() => [AttributeValue])
  @OneToMany(() => AttributeValue, 'attribute', { eager: true })
  values = new Collection<AttributeValue>(this);

  // Translation properties
  @Field(() => LanguageCode)
  languageCode?: LanguageCode;

  @Field()
  name?: string;
}
