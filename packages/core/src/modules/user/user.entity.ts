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

@Entity({ tableName: "users" })
@ObjectType()
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
  private async hashPassword({ changeSet }: EventArgs<UserEntity>) {
    if (changeSet?.payload.password) {
      this.password = await bcrypt.hash(this.password, BCRYPT_SALT);
    }
  }
}
