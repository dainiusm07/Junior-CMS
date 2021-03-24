import { registerEnumType } from '@nestjs/graphql';

export enum LanguageCode {
  EN = 'EN',
}

registerEnumType(LanguageCode, { name: 'LanguageCode' });
