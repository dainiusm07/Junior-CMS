import { Entity, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { LanguageCode } from '../../config/i18n/LanguageCode';

@Entity({ abstract: true })
@ObjectType({ isAbstract: true })
export class BaseTranslation {
  @Field(() => LanguageCode)
  @Property({ type: String, primary: true, length: 3 })
  languageCode: LanguageCode;

  @Field(() => Date)
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
