import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

import { Attribute } from './attribute.entity';
import { BaseService } from '../shared/base.service';

@Injectable()
export class AttributeService extends BaseService<Attribute> {
  constructor(
    @InjectRepository(Attribute)
    private attributeRepo: EntityRepository<Attribute>,
  ) {
    super(attributeRepo, 'Attribute');
  }
}
