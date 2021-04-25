import { registerEnumType } from '@nestjs/graphql';

export enum ErrorCode {
  NOT_FOUND = 'NOT_FOUND',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  INPUT_VALIDATION = 'INPUT_VALIDATION',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
}

registerEnumType(ErrorCode, { name: 'ErrorCode' });
