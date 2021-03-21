import { Field, ObjectType } from '@nestjs/graphql';

import { BaseError } from './base.error';
import { ErrorCode } from './error-code';

@ObjectType('ValidationError')
export class CmsValidationError {
  @Field()
  path: string;

  @Field(() => [String])
  messages: string[];
}

@ObjectType()
export class InputValidationError extends BaseError {
  readonly errorCode = ErrorCode.INPUT_VALIDATION;
  readonly message = 'Invalid input';

  @Field(() => [CmsValidationError])
  errors: CmsValidationError[];

  constructor(errors: CmsValidationError[]) {
    super();
    this.errors = errors;
  }
}
