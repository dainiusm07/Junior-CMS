import { LanguageCode } from '@junior-cms/common';
import { Entity, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';

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
