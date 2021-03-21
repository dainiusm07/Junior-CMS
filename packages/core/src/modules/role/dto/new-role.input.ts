import { Field, InputType } from '@nestjs/graphql';

import { Permission } from '../../../common/permission.enum';

@InputType()
export class NewRoleInput {
  @Field()
  name: string;

  @Field(() => [Permission])
  permissions: Permission[];
}
