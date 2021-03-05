import { Field, InputType, Int } from "@nestjs/graphql";
import { UserEntity } from "../user.entity";

@InputType()
export class UpdateUserInput implements Partial<UserEntity> {
  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field(() => Int, { nullable: true })
  roleId?: number;
}
