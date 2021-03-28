import { wrap } from '@mikro-orm/core';

import { DEFAULT_LANGUAGE_CODE } from '../../../common/environment';
import { LanguageCode } from '../../i18n/language-code.enum';
import { Translatable, Translated } from '../../../types/Translations';

export const translateEntity = <T extends Translatable>(
  entity: T,
  languageCode: LanguageCode = DEFAULT_LANGUAGE_CODE,
): Translated<T> => {
  if (
    !entity.translations ||
    !entity.translations.isInitialized() ||
    !entity.translations.length
  ) {
    return entity as never;
  }

  const translations: any[] = [...entity.translations.getItems()];

  let finalTranslation: any;

  let translation = translations.find(
    (item) => item.languageCode && item.languageCode === languageCode,
  );

  if (!translation) {
    translation = translations.find(
      (item) =>
        item.languageCode && item.languageCode === DEFAULT_LANGUAGE_CODE,
    );
  }

  if (translation) {
    finalTranslation = translation;
  } else {
    finalTranslation = translations[0];
  }

  // Deleting reference
  finalTranslation = { ...finalTranslation };

  Object.entries(finalTranslation).forEach(([key, value]) => {
    if (
      value !== null &&
      !(value instanceof Date) &&
      typeof value === 'object'
    ) {
      delete finalTranslation[key];
    }
  });

  if ('updatedAt' in entity && finalTranslation.updatedAt) {
    const entityUpdatedAt = (entity as any).updatedAt || new Date(0);
    const translationUpdatedAt = finalTranslation.updatedAt;

    if (
      entityUpdatedAt instanceof Date &&
      translationUpdatedAt instanceof Date &&
      entityUpdatedAt.getTime() > translationUpdatedAt.getTime()
    ) {
      Object.assign(finalTranslation, { updatedAt: entityUpdatedAt });
    }
  }

  return wrap(entity).assign(finalTranslation) as never;
};
