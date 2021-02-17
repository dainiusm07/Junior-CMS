import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { permissions } from "../../config/permissions";
import { IPermissionDefinition } from "../../config/permissions/generate-permissions";
import { RoleEntity } from "../../entities/role/role.entity";
import { BaseService } from "./base.service";

@Injectable()
export class RoleService extends BaseService<RoleEntity> {
  private permissions: IPermissionDefinition[];

  constructor(
    @InjectRepository(RoleEntity) private roleRepo: Repository<RoleEntity>
  ) {
    super(roleRepo);

    this.permissions = permissions;
  }

  findMany() {
    return this.roleRepo.find();
  }

  getAssignablePermissions() {
    return this.permissions.filter((perm) => perm.assignable);
  }
}
