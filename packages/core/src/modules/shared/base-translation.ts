import { Entity, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { LanguageCode } from '../../i18n/language-code.enum';

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
