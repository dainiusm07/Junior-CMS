import { Injectable } from '@nestjs/common';
import { EntityRepository, FilterQuery, LoadStrategy } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

import { Attribute } from './attribute.entity';
import { BaseService } from '../shared/base.service';

@Injectable()
export class AttributeService extends BaseService<Attribute> {
  constructor(
    @InjectRepository(Attribute)
    private attributeRepo: EntityRepository<Attribute>,
  ) {
    super(attributeRepo);
  }

  findOneOrFail(where: FilterQuery<Attribute>) {
    return super.findOneOrFail(where, {
      populate: { values: LoadStrategy.JOINED },
    });
  }
  findAll() {
    return this.attributeRepo.findAll({ populate: { values: true } });
  }
}
