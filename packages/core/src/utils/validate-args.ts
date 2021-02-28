import { AnySchema, ValidationError, number, object, string } from "yup";

import { InputValidationError } from "../common/errors/input-validation.error";

type Shape =
  | {
      [K: string]: AnySchema;
    }
  | AnySchema;

export const validateArgs = async (shape: Shape | undefined, value: any) => {
  if (!shape) {
    return value;
  }
  const isObject = !(shape instanceof number || shape instanceof string);

  const schema = isObject
    ? object().shape(shape as never)
    : (shape as AnySchema);

  try {
    await schema.validate(value, { abortEarly: false });

    return value;
  } catch (error) {
    if (error instanceof ValidationError) {
      const errors = error.inner.map(({ path, message }) => {
        return {
          path: path!,
          message,
        };
      });

      return new InputValidationError(errors);
    }

    throw error;
  }
};
