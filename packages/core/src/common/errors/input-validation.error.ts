import { Field, ObjectType } from "@nestjs/graphql";
import { BaseError } from "./base.error";

@ObjectType()
class ValidationError {
  @Field()
  path: string;

  @Field()
  message: string;
}

@ObjectType()
export class InputValidationError extends BaseError {
  readonly __typename = "InputValidationError";
  readonly errorCode = "INPUT_VALIDATION_ERROR";

  message = "Invalid input";

  @Field(() => [ValidationError])
  errors: ValidationError[];

  constructor(errors: ValidationError[]) {
    super();
    this.errors = errors;
  }
}
