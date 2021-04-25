import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { NewUserInput } from './new-user.input';

@InputType()
export class UpdateUserProfileInput extends PartialType(
  OmitType(NewUserInput, ['roleId']),
) {
  @Field()
  currentPassword: string;
}
