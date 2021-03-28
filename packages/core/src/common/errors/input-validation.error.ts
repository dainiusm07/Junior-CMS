import { Field, ObjectType } from '@nestjs/graphql';
import { I18nError, I18nVariables } from '../../i18n/i18n.error';

import { ErrorCode } from './error-code.enum';

@ObjectType('ValidationError')
export class CmsValidationError {
  @Field()
  path: string;

  @Field(() => [String])
  messages: string[];

  variables: I18nVariables[];
}

@ObjectType()
export class InputValidationError extends I18nError {
  readonly errorCode = ErrorCode.INPUT_VALIDATION;
  readonly message = 'error.invalid-input';

  @Field(() => [CmsValidationError])
  errors: CmsValidationError[];

  constructor(errors: CmsValidationError[]) {
    super();
    this.errors = errors;
  }

  translate(t: i18nAPI['__']) {
    this.errors = this.errors.map((error) => {
      const messages = error.messages.map((message, i) => {
        const variables: Record<string, string> = {};

        Object.entries(error.variables[i]).forEach(([key, value]) => {
          variables[key] = typeof value === 'string' ? t(value) : String(value);
        });

        return t(message, variables);
      });

      return {
        ...error,
        messages,
      };
    });
  }
}
