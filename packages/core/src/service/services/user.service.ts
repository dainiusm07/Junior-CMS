import { FindOneOptions, In, Not, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { UserEntity } from "../../entities/user/user.entity";
import { UserRolesEntity } from "../../entities/user/user-roles.entity";
import { BaseKeys } from "../../types";
import { MutationUpdateUserArgs } from "@junior-cms/common";
import { BaseService } from "./base.service";

Injectable();
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(UserRolesEntity)
    private userRolesRepo: Repository<UserRolesEntity>
  ) {
    super(userRepo);
  }

  findOne(options: FindOneOptions<UserEntity>) {
    return super.findOne({ relations: ["roles"], ...options });
  }

  findMany() {
    return this.userRepo.find();
  }

  async assignRoles(
    rolesIds: MutationUpdateUserArgs["input"]["roleIds"],
    commonFields: Omit<UserRolesEntity, BaseKeys | "roleId" | "user">
  ): Promise<void> {
    if (!rolesIds) {
      return;
    }

    const newUserRoles = rolesIds.map((roleId) => ({
      roleId,
      ...commonFields,
    }));

    await this.userRolesRepo
      .createQueryBuilder()
      .insert()
      .values(newUserRoles)
      .orIgnore(true)
      .execute();

    await this.userRolesRepo.delete({
      userId: commonFields.userId,
      ...(rolesIds && { roleId: Not(In(rolesIds)) }),
    });
  }
}
