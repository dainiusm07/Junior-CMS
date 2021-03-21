import {
  EntityRepository,
  FilterQuery,
  FindOneOptions,
  LoadStrategy,
  Populate,
} from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { BaseService } from '../shared/base.service';
import { User } from './user.entity';

@Injectable()
export class UserService extends BaseService<User> {
  populationSettings: Populate<User> = { role: LoadStrategy.JOINED };

  constructor(
    @InjectRepository(User)
    private userRepo: EntityRepository<User>,
  ) {
    super(userRepo);
  }

  findOneOrFail(where: FilterQuery<User>) {
    return this.userRepo.findOneOrFail(where, {
      populate: this.populationSettings,
    });
  }

  findOne(where: FilterQuery<User>) {
    return this.userRepo.findOne(where, {
      populate: this.populationSettings,
    });
  }
}
