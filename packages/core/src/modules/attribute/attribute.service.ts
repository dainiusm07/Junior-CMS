import { Injectable } from '@nestjs/common';
import { EntityRepository, FilterQuery, LoadStrategy } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

import { Attribute } from './attribute.entity';
import { BaseService } from '../shared/base.service';

@Injectable()
export class AttributeService extends BaseService<Attribute> {
  constructor(
    @InjectRepository(Attribute)
    protected _repo: EntityRepository<Attribute>,
  ) {
    super();
  }

  findOneOrFail(where: FilterQuery<Attribute>) {
    return super.findOneOrFail(where, {
      populate: { values: LoadStrategy.JOINED },
    });
  }
  findAll() {
    return this._repo.findAll({ populate: { values: true } });
  }
}
