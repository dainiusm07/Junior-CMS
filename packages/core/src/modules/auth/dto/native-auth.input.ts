import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NativeAuthInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
