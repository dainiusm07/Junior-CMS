import { Field, InputType, Int } from '@nestjs/graphql';

import { PartialEntity } from '../../../types';
import { Role } from '../../role/role.entity';
import {
  CmsMinLength,
  Email,
  Exists,
  NoWhiteSpace,
  Password,
} from '../../shared/constraints';
import { User } from '../user.entity';

@InputType()
export class NewUserInput implements PartialEntity<User> {
  @CmsMinLength(3)
  @NoWhiteSpace()
  @Field()
  firstname: string;

  @CmsMinLength(3)
  @NoWhiteSpace()
  @Field()
  lastname: string;

  @Email(User)
  @Field()
  email: string;

  @Password()
  @Field()
  password: string;

  @Exists(Role, 'id')
  @Field(() => Int)
  roleId: number;
}
