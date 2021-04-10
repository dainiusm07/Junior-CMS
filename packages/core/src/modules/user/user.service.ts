import {
  EntityData,
  EntityRepository,
  FilterQuery,
  LoadStrategy,
  Populate,
} from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { EntityHelper } from '../shared/helpers';
import { IListOptions } from '../shared/list-utils';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private populationSettings: Populate<User> = { role: LoadStrategy.JOINED };
  private entityHelper: EntityHelper<User>;

  constructor(
    @InjectRepository(User)
    protected _repo: EntityRepository<User>,
  ) {
    this.entityHelper = new EntityHelper(_repo);
  }

  findOneOrFail(where: FilterQuery<User>) {
    return this.entityHelper.findOneOrFail(where, {
      populate: this.populationSettings,
    });
  }

  findOne(where: FilterQuery<User>) {
    return this._repo.findOne(where, {
      populate: this.populationSettings,
    });
  }

  findList(options: IListOptions<User>) {
    return this.entityHelper.findList(options);
  }

  insert(data: EntityData<User>) {
    return this.entityHelper.insert(data);
  }

  updateOne(filter: FilterQuery<User>, data: EntityData<User>) {
    return this.entityHelper.updateOne(filter, data);
  }
}
