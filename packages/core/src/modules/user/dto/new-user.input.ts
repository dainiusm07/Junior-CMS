import { Field, InputType, Int } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

import { PartialEntity } from '../../../types';
import { Role } from '../../role/role.entity';
import { Email, NoWhiteSpace, Password } from '../../shared/constraints';
import { Exists } from '../../shared/constraints/exists.constraint';
import { User } from '../user.entity';

@InputType()
export class NewUserInput implements PartialEntity<User> {
  @MinLength(3)
  @NoWhiteSpace()
  @Field()
  firstname: string;

  @MinLength(3)
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
