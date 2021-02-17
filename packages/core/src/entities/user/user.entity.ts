import * as bcrypt from "bcrypt";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
} from "typeorm";

import { BCRYPT_SALT } from "../../environments";
import { BaseEntity } from "../base/base.entity";
import { RoleEntity } from "../role/role.entity";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date | null;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => RoleEntity, (role) => role.id)
  @JoinTable({
    name: "users_roles",
    joinColumn: {
      name: "user_id",
    },
    inverseJoinColumn: {
      name: "role_id",
    },
  })
  roles: RoleEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  protected async hashPassword() {
    if (!this.password) return;

    this.password = await bcrypt.hash(this.password, BCRYPT_SALT);
  }
}
