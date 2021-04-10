import { Collection, EntityData } from '@mikro-orm/core';
import { LanguageCode } from '../i18n/language-code.enum';
import { BaseTranslation } from '../modules/shared/base-translation.entity';

export type MaybeTranslatable<T, P> = T & {
  translations?: Collection<P>;
};

export type Translatable<T = any> = {
  translations: Collection<T>;
};

export type Translation<T extends BaseTranslation> = {
  [K in keyof T]?: T[K];
} &
  Translatable<T>;

export type Translated<T extends Translatable> = T & TranslationType<T>;

export type TranslationType<
  T extends Translatable
> = T['translations'] extends Collection<infer U> ? U : never;

export type TranslatableEntityData<T> = EntityData<T> & {
  languageCode: LanguageCode;
};
