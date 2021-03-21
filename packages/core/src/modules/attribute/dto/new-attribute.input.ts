import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewAttributeInput {
  @Field()
  name: string;
}
