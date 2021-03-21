import { Field, ObjectType } from '@nestjs/graphql';

import { ErrorCode } from './error-code';

@ObjectType({ isAbstract: true })
export abstract class BaseError {
  @Field()
  abstract message: string;

  @Field(() => ErrorCode)
  abstract errorCode: ErrorCode;
}
