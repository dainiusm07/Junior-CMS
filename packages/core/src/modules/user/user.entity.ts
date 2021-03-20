import { BeforeCreate, BeforeUpdate, Entity, EventArgs, OneToOne, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';

import { BCRYPT_SALT } from '../../common/environment';
import { capitalizeFirstLetter } from '../../utils/capitalize-first-letter';
import { RoleEntity } from '../role/role.entity';
import { BaseEntity } from '../shared/base.entity';

@Entity({ tableName: "users" })
@ObjectType("User")
export class UserEntity extends BaseEntity {
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

  @Field(() => RoleEntity)
  @OneToOne({
    entity: () => RoleEntity,
    unique: false,
  })
  role: RoleEntity;

  @BeforeCreate()
  @BeforeUpdate()
  private async hashPassword({ changeSet }: EventArgs<UserEntity>) {
    const { password: newPassword } = changeSet?.payload || {};

    if (newPassword) {
      this.password = await bcrypt.hash(newPassword, BCRYPT_SALT);
    }
  }

  @BeforeCreate()
  @BeforeUpdate()
  private async capitalize({ changeSet }: EventArgs<UserEntity>) {
    const { firstname, lastname } = changeSet?.payload || {};

    if (firstname) {
      this.firstname = capitalizeFirstLetter(firstname);
    }

    if (lastname) {
      this.lastname = capitalizeFirstLetter(lastname);
    }
  }
}
