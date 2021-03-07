import { ObjectType } from "@nestjs/graphql";

import { BaseError } from "./base.error";

@ObjectType()
export class NotFoundError extends BaseError {
  readonly errorCode = "NOT_FOUND_ERROR";
  readonly message: string;

  constructor(name: string) {
    super();
    this.message = `${name} not found`;
  }
}
