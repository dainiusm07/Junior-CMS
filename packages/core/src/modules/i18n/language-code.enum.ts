import { registerEnumType } from '@nestjs/graphql';

export enum LanguageCode {
  EN = 'en',
  LT = 'lt',
}

registerEnumType(LanguageCode, { name: 'LanguageCode' });
