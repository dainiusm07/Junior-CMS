import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { classToPlain, plainToClass } from "class-transformer";
import { validate } from "class-validator";

import {
  CmsValidationError,
  InputValidationError,
} from "../common/errors/input-validation.error";

@Injectable()
export class InputValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value !== "object" || value === null) {
      return value;
    }

    const plain = plainToClass(metadata.metatype!, value, {
      exposeUnsetFields: false,
    });

    const result = await validate(plain, { skipMissingProperties: true });

    if (result.length) {
      const errors: CmsValidationError[] = [];

      result.forEach((err) => {
        const error: CmsValidationError = {
          path: err.property,
          messages: [],
        };

        if (err.constraints) {
          const messages = Object.values(err.constraints);
          error.messages = messages;
        }

        errors.push(error);
      });

      throw new InputValidationError(errors);
    }

    // Converting back to object because MikroORM requires plain objects
    return classToPlain(plain, {
      exposeUnsetFields: false,
      ignoreDecorators: true,
    });
  }
}
