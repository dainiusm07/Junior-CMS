const { Collection } = jest.requireActual('@mikro-orm/core');

jest.mock('@mikro-orm/core', () => ({
  wrap(entity: object) {
    return {
      assign(value: object) {
        return Object.assign(entity, value);
      },
    };
  },
}));

import { DEFAULT_LANGUAGE_CODE } from '../../../common/environment';
import { LanguageCode } from '../../../i18n/language-code.enum';
import { translateEntity } from './translate-entity';

type TestTranslation = {
  language: string;
  languageCode: string;
  updatedAt?: Date;
};

const TestLanguageCodes = {
  LT: 'LT' as LanguageCode,
  RU: 'RU' as LanguageCode,
  DEFAULT: DEFAULT_LANGUAGE_CODE,
};

const defaultLanguageCodeTranslation: TestTranslation = {
  language: 'English',
  languageCode: DEFAULT_LANGUAGE_CODE,
  updatedAt: new Date('2000-12-12'),
};

const lithuanianTranslation: TestTranslation = {
  language: 'Lithuanian',
  languageCode: 'LT',
};

const russianTranslation: TestTranslation = {
  language: 'Russian',
  languageCode: 'RU',
  updatedAt: new Date('2030-11-02'),
};

const getEntityWithTranslations = (
  updatedAt?: Date,
  args: TestTranslation[] = [
    defaultLanguageCodeTranslation,
    lithuanianTranslation,
    russianTranslation,
  ],
) => {
  return {
    translations: new Collection({} as any, args),
    updatedAt,
  };
};

describe('translateEntity', () => {
  it('should return translated entity by provided languageCode', () => {
    const entity = getEntityWithTranslations();

    const translatedEntity = translateEntity(entity, TestLanguageCodes.LT);

    expect(translatedEntity).toMatchObject(lithuanianTranslation);
  });

  it('should return translated entity by default languageCode', () => {
    const entity = getEntityWithTranslations();

    const translatedEntity = translateEntity(entity);

    expect(translatedEntity).toMatchObject(defaultLanguageCodeTranslation);
  });
  it(`should return translated entity if no languageCode are provided and no
     translation with default language code were found but there is translation`, () => {
    const entity = getEntityWithTranslations(undefined, [russianTranslation]);

    const translatedEntity = translateEntity(entity);

    expect(translatedEntity).toMatchObject(russianTranslation);
  });

  it(`should change entity updatedAt to translations when translation is newer`, () => {
    const entity = getEntityWithTranslations(new Date('2000'), [
      russianTranslation,
    ]);

    const translatedEntity = translateEntity(entity);

    expect(translatedEntity.updatedAt).toBe(russianTranslation.updatedAt);
  });

  it(`should not change entity updatedAt to translations when entity is newer`, () => {
    const updatedAt = new Date('3000');
    const entity = getEntityWithTranslations(updatedAt);

    const translatedEntity = translateEntity(entity);

    expect(translatedEntity.updatedAt).toBe(updatedAt);
  });

  it(`should delete all object values from translation when translating entity`, () => {
    const extendedDefaultTranslation = {
      ...defaultLanguageCodeTranslation,
      testProp: { name: 'TEST' },
    };

    const entity = getEntityWithTranslations(undefined, [
      extendedDefaultTranslation,
    ] as any);

    const translatedEntity = translateEntity(entity);

    expect(translatedEntity).not.toMatchObject(extendedDefaultTranslation);
    expect(translatedEntity).toMatchObject(defaultLanguageCodeTranslation);
  });

  it(`should return not translated entity if there is no translations`, () => {
    const entity = getEntityWithTranslations(undefined, []);

    const translatedEntity = translateEntity(entity);

    expect(translatedEntity).toBe(entity);
  });
});
