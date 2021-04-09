import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

import { BaseService } from '../shared/base.service';
import { AttributeValue } from './attribute-value.entity';
import { translationsMixin } from '../shared/mixins/translations.mixin';
import { AttributeValueTranslation } from './attribute-value-translation.entity';

@Injectable()
export class AttributeValueService extends translationsMixin<AttributeValue>(
  BaseService,
) {
  constructor(
    @InjectRepository(AttributeValue)
    protected _repo: EntityRepository<AttributeValue>,
    @InjectRepository(AttributeValueTranslation)
    protected _translationRepo: EntityRepository<AttributeValueTranslation>,
  ) {
    super();
  }
}
