import { Injectable } from '@nestjs/common';
import { EntityData, EntityRepository, FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

import { AttributeValue } from './attribute-value.entity';
import { AttributeValueTranslation } from './attribute-value-translation.entity';
import { TranslatableEntityHelper } from '../shared/helpers';
import { TranslatableEntityData } from '../../types/Translations';
import { CmsContext } from '../../types/CmsContext';

@Injectable()
export class AttributeValueService {
  private entityHelper: TranslatableEntityHelper<AttributeValue>;

  constructor(
    @InjectRepository(AttributeValue)
    protected _repo: EntityRepository<AttributeValue>,
    @InjectRepository(AttributeValueTranslation)
    protected _translationRepo: EntityRepository<AttributeValueTranslation>,
  ) {
    this.entityHelper = new TranslatableEntityHelper(_repo, _translationRepo);
  }

  async insert(data: TranslatableEntityData<AttributeValue>) {
    return this.entityHelper.insert(data);
  }

  async updateOne(
    { languageCode }: CmsContext,
    filter: FilterQuery<AttributeValue>,
    data: EntityData<AttributeValue>,
  ) {
    return this.entityHelper.updateOne(filter, data, languageCode);
  }

  async addTranslation(
    data: TranslatableEntityData<AttributeValueTranslation>,
  ) {
    return this.entityHelper.addTranslation(data);
  }
}
