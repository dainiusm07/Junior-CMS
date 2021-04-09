import { ExpressContext } from 'apollo-server-express';
import DataLoader from 'dataloader';

import { LanguageCode } from '../i18n/language-code.enum';

type DataLoaders = Partial<Record<string, DataLoader<any, any>>>;

export type CmsContext = {
  req: ExpressContext['req'];
  languageCode: LanguageCode;
  populationLoaders: DataLoaders;
};
