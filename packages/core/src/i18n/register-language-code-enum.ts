import { LanguageCode } from '@junior-cms/common';
import { registerEnumType } from '@nestjs/graphql';

registerEnumType(LanguageCode, { name: 'LanguageCode' });
