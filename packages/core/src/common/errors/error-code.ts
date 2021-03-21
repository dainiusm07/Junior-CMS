import { registerEnumType } from '@nestjs/graphql';

export enum ErrorCode {
  NOT_FOUND,
  INPUT_VALIDATION,
}

registerEnumType(ErrorCode, { name: 'ErrorCode' });
