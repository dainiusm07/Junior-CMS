import { Constructor } from '@mikro-orm/core';
import { ObjectType } from '@nestjs/graphql';
import { formatEntityName } from '../../utils/format-entity-name';

import { BaseError } from './base.error';
import { ErrorCode } from './error-code';

type EntityName = string | Constructor<any>;

@ObjectType()
export class ResultError extends BaseError {
  constructor(public errorCode: ErrorCode, public message: string) {
    super();
  }

  static notFound(name: EntityName) {
    const message = `${formatEntityName(name)} not found`;

    return new ResultError(ErrorCode.NOT_FOUND, message);
  }

  static alreadyExists(name: EntityName) {
    const message = `${formatEntityName(name)} already exists`;

    return new ResultError(ErrorCode.ALREADY_EXISTS, message);
  }
}
