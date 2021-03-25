import { registerEnumType } from '@nestjs/graphql';

export enum ErrorCode {
  NOT_FOUND,
  INPUT_VALIDATION,
  ALREADY_EXISTS,
}

registerEnumType(ErrorCode, { name: 'ErrorCode' });
