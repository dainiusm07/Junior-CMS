import { Constructor } from '@mikro-orm/core';
import { ObjectType } from '@nestjs/graphql';
import { I18nError, I18nVariables } from '../../i18n/i18n.error';
import { formatEntityName } from '../../utils/format-entity-name';
import { ErrorCode } from './error-code.enum';

export type CmsEntityName = string | Constructor<any>;

@ObjectType()
export class ErrorResult extends I18nError {
  constructor(
    public errorCode: ErrorCode,
    public message: string,
    public variables?: I18nVariables,
  ) {
    super();
  }

  static notFound(name: CmsEntityName) {
    name = formatEntityName(name);

    return new ErrorResult(ErrorCode.NOT_FOUND, 'error.not-found', { name });
  }

  static alreadyExists(name: CmsEntityName) {
    name = formatEntityName(name);

    return new ErrorResult(ErrorCode.ALREADY_EXISTS, 'error.already-exists', {
      name,
    });
  }

  static incorrectLoginCredentials(name: CmsEntityName) {
    name = formatEntityName(name);

    return new ErrorResult(
      ErrorCode.INVALID_CREDENTIALS,
      'error.incorrect-email-or-password',
      {
        name,
      },
    );
  }
}
