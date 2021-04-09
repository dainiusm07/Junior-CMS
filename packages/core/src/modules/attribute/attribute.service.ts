import { Injectable } from '@nestjs/common';
import { EntityRepository, FilterQuery, LoadStrategy } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

import { Attribute } from './attribute.entity';
import { BaseService } from '../shared/base.service';
import { translationsMixin } from '../shared/mixins/translations.mixin';
import { AttributeTranslation } from './attribute-translation.entity';
import { translateEntity } from '../shared/helpers/translate-entity';
import { LanguageCode } from '../../i18n/language-code.enum';
import { CmsContext } from '../../types/CmsContext';
import { AttributeValue } from '../attribute-value/attribute-value.entity';

@Injectable()
export class AttributeService extends translationsMixin<Attribute>(
  BaseService,
) {
  constructor(
    @InjectRepository(Attribute)
    protected _repo: EntityRepository<Attribute>,
    @InjectRepository(AttributeTranslation)
    protected _translationRepo: EntityRepository<AttributeTranslation>,
  ) {
    super();
  }

  async findOneOrFail(
    filter: FilterQuery<Attribute>,
    options: undefined,
    ctx: CmsContext,
  ) {
    return super.findOneOrFail(
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

  translateAttributeValues(ctx: CmsContext, attributeValues: AttributeValue[]) {
    return attributeValues.map((value) =>
      translateEntity(value, ctx.languageCode),
    );
  }
}
