import {
  EntityRepository,
  FilterQuery,
  FindOneOptions,
  LoadStrategy,
} from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";

import { BaseService } from "../shared/base.service";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) private userRepo: EntityRepository<UserEntity>
  ) {
    super(userRepo, "User");
  }

  findOne(
    options: FilterQuery<UserEntity>,
    populate?: FindOneOptions<UserEntity, any>
  ) {
    return super.findOne(options, {
      populate: { role: LoadStrategy.JOINED },
      ...populate,
    });
  }
}
