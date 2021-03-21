import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class BaseError {
  @Field()
  abstract message: string;

  @Field()
  abstract errorCode: string;
}
