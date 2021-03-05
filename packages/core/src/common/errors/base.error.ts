import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ isAbstract: true })
export abstract class BaseError {
  abstract __typename: string;

  @Field()
  abstract message: string;

  @Field()
  abstract errorCode: string;
}
