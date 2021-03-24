import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

import { BaseService } from '../shared/base.service';
import { AttributeValue } from './attribute-value.entity';

@Injectable()
export class AttributeValueService extends BaseService<AttributeValue> {
  constructor(
    @InjectRepository(AttributeValue)
    protected _repo: EntityRepository<AttributeValue>,
  ) {
    super();
  }
}
