import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { permissions } from "../../config/permissions";
import { RoleEntity } from "../../entities/role/role.entity";
import createBaseService from "../helpers/create-base-service";

@Injectable()
export class RoleService extends createBaseService(RoleEntity) {
  permissions = permissions;
  constructor(
    @InjectRepository(RoleEntity) private roleRepo: Repository<RoleEntity>
  ) {
    super(roleRepo);
  }

  findMany() {
    return this.roleRepo.find();
  }

  getPermissions() {
    return this.permissions.filter((perm) => !perm.internal);
  }
}
