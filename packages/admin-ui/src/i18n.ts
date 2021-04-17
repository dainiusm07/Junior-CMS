import { DEFAULT_LANGUAGE_CODE, LanguageCode } from '@junior-cms/common';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { LOCAL_STORAGE_LANG } from './common/constants';
import { isDev } from './common/environment';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: DEFAULT_LANGUAGE_CODE,
    supportedLngs: Object.values(LanguageCode),
    debug: isDev,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'query'],
      lookupLocalStorage: LOCAL_STORAGE_LANG,
    },
  });

export default i18n;
