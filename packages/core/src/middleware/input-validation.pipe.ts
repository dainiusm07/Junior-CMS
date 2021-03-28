import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import {
  CmsValidationError,
  InputValidationError,
} from '../common/errors/input-validation.error';
import { I18nVariables } from '../i18n/i18n.error';

@Injectable()
export class InputValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata.metatype) {
      throw Error('Invalid metatype of argument!');
    }

    const plain = plainToClass(metadata.metatype, value, {
      exposeUnsetFields: false,
    });

    const result = await validate(plain, { skipMissingProperties: true });

    if (result.length) {
      const errors: CmsValidationError[] = [];

      result.forEach((err) => {
        const error: CmsValidationError = {
          path: err.property,
          messages: [],
          variables: [],
        };

        if (err.constraints) {
          Object.entries(err.constraints).forEach(([key, value]) => {
            let variables: I18nVariables = {};

            if (err.contexts && err.contexts[key]) {
              variables = err.contexts[key];
            }

            error.messages.push(value);
            error.variables.push(variables);
          });
        }

        errors.push(error);
      });

      throw new InputValidationError(errors);
    }

    return plain;
  }
}
