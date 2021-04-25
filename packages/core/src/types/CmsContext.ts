import { LanguageCode } from '@junior-cms/common';
import { ExpressContext } from 'apollo-server-express';
import DataLoader from 'dataloader';
import { User } from '../modules/user/user.entity';

type DataLoaders = Partial<Record<string, DataLoader<any, any>>>;

export type CmsContext = {
  req: ExpressContext['req'];
  languageCode: LanguageCode;
  populationLoaders: DataLoaders;
  user: User | null;
};
