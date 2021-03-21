import {
  EntityRepository,
  FilterQuery,
  FindOneOptions,
  LoadStrategy,
} from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { BaseService } from '../shared/base.service';
import { User } from './user.entity';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private userRepo: EntityRepository<User>,
  ) {
    super(userRepo, 'User');
  }

  findOne(options: FilterQuery<User>, populate?: FindOneOptions<User, any>) {
    return super.findOne(options, {
      populate: { role: LoadStrategy.JOINED },
      ...populate,
    });
  }
}
