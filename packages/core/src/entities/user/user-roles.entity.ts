import { Column, CreateDateColumn, Entity } from "typeorm";

@Entity("users_roles")
export class UserRolesEntity {
  // NOTE: When typeorm sync is enabled this column causes errors
  @Column({ name: "assigned_by" })
  assignedBy: number;

  @Column({ name: "user_id", primary: true })
  userId: number;

  @Column({ name: "role_id", primary: true })
  roleId: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
