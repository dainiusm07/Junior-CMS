import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class NewUserInput {
  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => Int)
  roleId: number;
}
