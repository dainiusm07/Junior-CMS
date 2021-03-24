import {
  EntityRepository,
  FilterQuery,
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
    protected _repo: EntityRepository<User>,
  ) {
    super();
  }

  findOneOrFail(where: FilterQuery<User>) {
    return this._repo.findOneOrFail(where, {
      populate: this.populationSettings,
    });
  }

  findOne(where: FilterQuery<User>) {
    return this._repo.findOne(where, {
      populate: this.populationSettings,
    });
  }
}
