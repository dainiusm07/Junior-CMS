import * as bcrypt from "bcrypt";
import {
  Entity,
  Property,
  BeforeCreate,
  BeforeUpdate,
  EventArgs,
  OneToOne,
} from "@mikro-orm/core";
import { Field, ObjectType } from "@nestjs/graphql";

import { BCRYPT_SALT } from "../../common/environment";
import { BaseEntity } from "../shared/base.entity";
import { RoleEntity } from "../role/role.entity";
import { capitalizeFirstLetter } from "../../utils/capitalize-first-letter";

@Entity({ tableName: "users" })
@ObjectType("User")
export class UserEntity extends BaseEntity {
  @Field(() => Date, { nullable: true })
  @Property({ nullable: true })
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
  protected async hashPassword({ changeSet }: EventArgs<UserEntity>) {
    if (changeSet?.payload.password) {
      this.password = await bcrypt.hash(this.password, BCRYPT_SALT);
    }
  }

  @BeforeCreate()
  @BeforeUpdate()
  protected async capitalize({ changeSet }: EventArgs<UserEntity>) {
    const { firstname, lastname } = changeSet?.payload || {};

    if (firstname) {
      this.firstname = capitalizeFirstLetter(firstname);
    }

    if (lastname) {
      this.lastname = capitalizeFirstLetter(lastname);
    }
  }
}
