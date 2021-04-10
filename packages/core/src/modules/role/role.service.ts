import { EntityData, EntityRepository, FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { EntityHelper } from '../shared/helpers';
import { IListOptions } from '../shared/list-utils';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  private entityHelper: EntityHelper<Role>;

  constructor(
    @InjectRepository(Role)
    protected _repo: EntityRepository<Role>,
  ) {
    this.entityHelper = new EntityHelper(_repo);
  }

  findOneOrFail(filter: FilterQuery<Role>) {
    return this.entityHelper.findOneOrFail(filter);
  }

  findList(options: IListOptions<Role>) {
    return this.entityHelper.findList(options);
  }

  insert(data: EntityData<Role>) {
    return this.entityHelper.insert(data);
  }

  updateOne(filter: FilterQuery<Role>, data: EntityData<Role>) {
    return this.entityHelper.updateOne(filter, data);
  }
}
