import {
  BeforeCreate,
  BeforeUpdate,
  Entity,
  EventArgs,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';

import { BCRYPT_SALT } from '../../common/environment';
import { capitalizeFirstLetter } from '../../utils/capitalize-first-letter';
import { Role } from '../role/role.entity';
import { BaseEntity } from '../shared/base.entity';

@Entity({ tableName: 'users' })
@ObjectType('User')
export class User extends BaseEntity {
  @Field(() => Date, { nullable: true })
  @Property({ type: Date, nullable: true })
  deletedAt: Date | null;

  @Field()
  @Property()
  firstname: string;

  @Field()
  @Property()
  lastname: string;

  @Field()
  @Property()
  email: string;

  @Field()
  @Property()
  password: string;

  @Field(() => Role)
  @OneToOne({
    entity: () => Role,
    unique: false,
  })
  role: Role;

  @BeforeCreate()
  @BeforeUpdate()
  private async hashPassword({ changeSet }: EventArgs<User>) {
    const { password: newPassword } = changeSet?.payload || {};

    if (newPassword) {
      this.password = await bcrypt.hash(newPassword, BCRYPT_SALT);
    }
  }

  @BeforeCreate()
  @BeforeUpdate()
  private async capitalize({ changeSet }: EventArgs<User>) {
    const { firstname, lastname } = changeSet?.payload || {};

    if (firstname) {
      this.firstname = capitalizeFirstLetter(firstname);
    }

    if (lastname) {
      this.lastname = capitalizeFirstLetter(lastname);
    }
  }
}
