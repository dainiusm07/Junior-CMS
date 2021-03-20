import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

import {
  CmsValidationError,
  InputValidationError,
} from "../common/errors/input-validation.error";

const isClass = (v?: unknown) => {
  return typeof v === "function" && /^\s*class\s+/.test(v.toString());
};
@Injectable()
export class InputValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!isClass(metadata.metatype)) {
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

    return plain;
  }
}
