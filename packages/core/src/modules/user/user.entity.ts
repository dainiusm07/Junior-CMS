import * as bcrypt from "bcrypt";
import {
  Entity,
  Property,
  BeforeCreate,
  BeforeUpdate,
  EventArgs,
  OneToOne,
} from "@mikro-orm/core";

import { BCRYPT_SALT } from "../../common/environment";
import { BaseEntity } from "../shared/base.entity";
import { RoleEntity } from "../role/role.entity";
import { Typename } from "../../decorators";

@Entity({ tableName: "users" })
@Typename("User")
export class UserEntity extends BaseEntity {
  @Property({ nullable: true })
  deletedAt: Date | null;

  @Property()
  firstname: string;

  @Property()
  lastname: string;

  @Property()
  email: string;

  @Property()
  password: string;

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
