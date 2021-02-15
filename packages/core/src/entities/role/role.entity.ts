import { Maybe, Permission } from "@junior-cms/common";
import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base/base.entity";

@Entity("roles")
export class RoleEntity extends BaseEntity {
  @Column()
  name: string;

  @Column("text", { nullable: true })
  description: Maybe<string>;

  @Column("simple-array")
  permissions: Permission[];
}
