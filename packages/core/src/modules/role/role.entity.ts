import { Permission } from "@junior-cms/common/dist/graphql-types";
import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../common/base.entity";

@Entity({ tableName: "roles" })
export class RoleEntity extends BaseEntity {
  @Property()
  name: string;

  @Property({ type: "array" })
  permissions: Permission[];
}
