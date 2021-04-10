import {
  EntityData,
  EntityRepository,
  FilterQuery,
  FindOneOptions,
  LoadStrategy,
} from '@mikro-orm/core';

import { ErrorResult } from '../../../common/errors/error-result.error';
import {
  MaybeTranslatable,
  Translatable,
  TranslatableEntityData,
  Translated,
  TranslationType,
} from '../../../types/Translations';
import { EntityHelper } from './entity.helper';
import { translateEntity } from './translate-entity';
import { IListOptions, IListResponse } from '../list-utils';
import { BaseTranslation } from '../base-translation.entity';
import { LanguageCode } from '../../../i18n/language-code.enum';

export class TranslatableEntityHelper<
  T extends Translatable,
  P = TranslationType<T>
> extends EntityHelper<T> {
  private findOnePopulateOptions = { translations: LoadStrategy.JOINED };

  constructor(
    _repo: EntityRepository<T>,
    protected _translationRepo: EntityRepository<P>,
  ) {
    super(_repo);
  }

  /* Added languageCode parameter to method in derived class and made it required
   * @ts-expect-error */
  async findOneOrFail(
    filter: FilterQuery<T>,
    options: FindOneOptions<T> = {},
    languageCode: LanguageCode,
  ): Promise<Translated<T>> {
    if (typeof options.populate === 'object') {
      Object.assign(options.populate, this.findOnePopulateOptions);
    } else {
      options.populate = this.findOnePopulateOptions;
    }

    return super
      .findOneOrFail(filter, options)
      .then((entity) => translateEntity(entity, languageCode));
  }

  /* Added languageCode argument to method in derived class and made it required
   * @ts-expect-error */
  async findList(
    options: IListOptions<T>,
    languageCode: LanguageCode,
  ): Promise<IListResponse<Translated<T>>> {
    return super.findList(options).then((result) => {
      const items = result.items.map((item) =>
        translateEntity(item, languageCode),
      );

      return {
        ...result,
        items,
      };
    });
  }

  async insert(data: TranslatableEntityData<T>): Promise<Translated<T>> {
    const entity = this._repo.create(data);

    this._repo.assign(entity, {
      translations: [this._translationRepo.create(data)],
    });

    return super
      .insert(entity)
      .then((entity) => translateEntity(entity, data.languageCode));
  }

  /* Added languageCode argument to method in derived class and made it required
   * @ts-expect-error */
  async updateOne(
    filter: FilterQuery<T>,
    data: EntityData<T>,
    languageCode: LanguageCode,
  ): Promise<Translated<T>> {
    const entity: MaybeTranslatable<T, P> = await this.findOneOrFail(
      filter,
      undefined,
      languageCode,
    );

    if (entity.translations && entity.languageCode) {
      const translation = entity.translations
        .getItems()
        .find(
          (translation: BaseTranslation) =>
            translation.languageCode === entity.languageCode,
        );

      const newTranslationData = this._translationRepo.create(data);

      this._translationRepo.assign(translation, newTranslationData);
    }

    return super
      .updateOne(entity as never, entity)
      .then((result) => translateEntity(result, languageCode));
  }

  async addTranslation(data: TranslatableEntityData<P>) {
    this.deleteUndefinedProperties(data);

    const translation = this._translationRepo.create(data);

    const translationExists = await this._translationRepo.count(translation);

    if (translationExists) {
      throw ErrorResult.alreadyExists('translation');
    }

    await this._translationRepo.persistAndFlush(translation);

    return translation;
  }
}
