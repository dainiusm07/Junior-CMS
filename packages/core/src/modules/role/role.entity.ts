import { Permission } from "@junior-cms/common/dist/graphql-types";
import { Entity, Property } from "@mikro-orm/core";

import { Typename } from "../../decorators";
import { BaseEntity } from "../shared/base.entity";

@Entity({ tableName: "roles" })
@Typename("Role")
export class RoleEntity extends BaseEntity {
  @Property()
  name: string;

  @Property({ type: "array" })
  permissions: Permission[];
}
