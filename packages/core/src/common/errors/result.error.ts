import { ObjectType } from '@nestjs/graphql';

import { BaseError } from './base.error';
import { ErrorCode } from './error-code';

@ObjectType()
export class ResultError extends BaseError {
  constructor(public errorCode: ErrorCode, public message: string) {
    super();
  }

  static notFound(entityName: string) {
    const message = `${entityName} not found`;

    return new ResultError(ErrorCode.NOT_FOUND, message);
  }
}
