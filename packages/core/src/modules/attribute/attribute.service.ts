import { Injectable } from '@nestjs/common';
import {
  EntityData,
  EntityRepository,
  FilterQuery,
  LoadStrategy,
} from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

import { Attribute } from './attribute.entity';
import { AttributeTranslation } from './attribute-translation.entity';
import { translateEntity, TranslatableEntityHelper } from '../shared/helpers';
import { LanguageCode } from '../../i18n/language-code.enum';
import { CmsContext } from '../../types/CmsContext';
import { AttributeValue } from '../attribute-value/attribute-value.entity';
import { TranslatableEntityData } from '../../types/Translations';

@Injectable()
export class AttributeService {
  private entityHelper: TranslatableEntityHelper<Attribute>;

  constructor(
    @InjectRepository(Attribute)
    protected _repo: EntityRepository<Attribute>,
    @InjectRepository(AttributeTranslation)
    protected _translationRepo: EntityRepository<AttributeTranslation>,
  ) {
    this.entityHelper = new TranslatableEntityHelper(_repo, _translationRepo);
  }

  async findOneOrFail(ctx: CmsContext, filter: FilterQuery<Attribute>) {
    return this.entityHelper.findOneOrFail(
      filter,
      { populate: { values: LoadStrategy.JOINED } },
      ctx,
    );
  }

  async findAll(languageCode: LanguageCode) {
    return this._repo
      .findAll()
      .then((attributes) =>
        attributes.map((attribute) => translateEntity(attribute, languageCode)),
      );
  }

  async insert(data: TranslatableEntityData<Attribute>) {
    return this.entityHelper.insert(data);
  }

  async updateOne(
    filter: FilterQuery<Attribute> & { translations: unknown },
    data: EntityData<Attribute>,
  ) {
    return this.entityHelper.updateOne(filter, data);
  }

  async addTranslation(data: TranslatableEntityData<AttributeTranslation>) {
    return this.entityHelper.addTranslation(data);
  }

  translateAttributeValues(ctx: CmsContext, attributeValues: AttributeValue[]) {
    return attributeValues.map((value) =>
      translateEntity(value, ctx.languageCode),
    );
  }
}
