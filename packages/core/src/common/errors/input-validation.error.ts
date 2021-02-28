type ValidationError = {
  path: string;
  message: string;
};

export class InputValidationError {
  readonly __typename = "InputValidationError";
  readonly errorCode = "INPUT_VALIDATION_ERROR";
  constructor(public errors: ValidationError[]) {}
}
