import { RequestContext } from "@mikro-orm/core";
import { AnySchema } from "yup";

import { VALIDATE_ARGS_METADATA_KEY } from "../common/constants";
import { InputValidationError } from "../common/errors/input-validation.error";
import { SchemaGenFunc } from "../types";
import { validateArgs } from "../utils/validate-args";

type ValidationSettings<T> =
  | {
      [K in keyof T]?: SchemaGenFunc<any>;
    }
  | SchemaGenFunc<any>;

const getSchema = (
  methodName: string | symbol,
  index: number,
  argsMeta: any,
  validations: any
): AnySchema | undefined => {
  const [fieldName] =
    Object.entries(argsMeta).find(([_, value]) => value === index) || [];

  if (fieldName) {
    const schemaGenFunc = validations[fieldName];

    if (typeof schemaGenFunc === "function") {
      return schemaGenFunc(RequestContext.getEntityManager()!);
    }
  }

  return undefined;
};

export function Validate<T extends {}>(
  validations: ValidationSettings<T> = {}
): MethodDecorator {
  return (target: object, methodName: string | symbol, descriptor: any) => {
    const argsMeta =
      Reflect.getOwnMetadata(VALIDATE_ARGS_METADATA_KEY, target, methodName) ||
      {};

    const method = descriptor.value;
    descriptor.value = async function () {
      for (let i = 0; i < arguments.length; i++) {
        const schema = getSchema(methodName, i, argsMeta, validations);

        const result = await validateArgs(schema, arguments[i]);

        if (result instanceof InputValidationError) {
          return result;
        }

        arguments[i] = result;
      }

      return method?.apply(this, arguments);
    };
  };
}
