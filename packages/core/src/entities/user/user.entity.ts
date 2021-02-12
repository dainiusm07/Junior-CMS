import { BCRYPT_SALT } from "@environments";
import * as bcrypt from "bcrypt";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
} from "typeorm";

import { BaseEntity } from "../base/base.entity";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @DeleteDateColumn({ name: "deleted_at" })
  deteledAt: Date | null;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword() {
    if (!this.password) return;

    this.password = await bcrypt.hash(this.password, BCRYPT_SALT);
  }
}
