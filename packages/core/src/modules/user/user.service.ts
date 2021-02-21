import {
  EntityRepository,
  FilterQuery,
  LoadStrategy,
  QueryOrderMap,
} from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";

import { BaseService } from "../common/base.service";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) private userRepo: EntityRepository<UserEntity>
  ) {
    super(userRepo, "User");
  }

  findOne(options: FilterQuery<UserEntity>, populate?: any) {
    return super.findOne(options, {
      populate: { role: LoadStrategy.JOINED },
      ...populate,
    });
  }
}
