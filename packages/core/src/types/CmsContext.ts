import { ExpressContext } from 'apollo-server-express';
import { LanguageCode } from '../modules/i18n/language-code.enum';

export type CmsContext = {
  req: ExpressContext['req'];
  languageCode: LanguageCode;
};