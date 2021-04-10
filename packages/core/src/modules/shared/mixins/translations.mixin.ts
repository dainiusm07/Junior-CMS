import {
  Constructor,
  EntityData,
  EntityRepository,
  FilterQuery,
  FindOneOptions,
  LoadStrategy,
} from '@mikro-orm/core';

import { ErrorResult } from '../../../common/errors/error-result.error';
import { CmsContext } from '../../../types/CmsContext';
import {
  MaybeTranslatable,
  Translatable,
  TranslatableEntityData,
  Translated,
  TranslationType,
} from '../../../types/Translations';
import { BaseService } from '../base.service';
import { translateEntity } from '../helpers/translate-entity';
import { IListOptions, IListResponse } from '../list-utils';

export const translationsMixin = <
  T extends Translatable,
  P = TranslationType<T>
>(
  // eslint-disable-next-line @typescript-eslint/ban-types
  Cls: Constructor<BaseService<T>> | (Function & { prototype: BaseService<T> }),
) => {
  abstract class TranslationsMixin extends (Cls as Constructor<
    BaseService<T>
  >) {
    findOnePopulateOptions = { translations: LoadStrategy.JOINED };

    protected abstract _translationRepo: EntityRepository<P>;
    protected abstract _repo: EntityRepository<T>;

    async findOneOrFail(
      filter: FilterQuery<T>,
      options: FindOneOptions<T> = {},
      ctx?: CmsContext,
    ): Promise<Translated<T>> {
      if (typeof options.populate === 'object') {
        Object.assign(options.populate, this.findOnePopulateOptions);
      } else {
        options.populate = this.findOnePopulateOptions;
      }

      return super
        .findOneOrFail(filter, options)
        .then((entity) => translateEntity(entity, ctx?.languageCode));
    }

    async findList(
      options: IListOptions<T>,
      ctx?: CmsContext,
    ): Promise<IListResponse<Translated<T>>> {
      return super.findList(options).then((result) => {
        const items = result.items.map((item) =>
          translateEntity(item, ctx?.languageCode),
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

      /**
       *  Already translated, because under the hood insert uses findOneOrFail
       *  which is translating it
       *  */
      return super.insert(entity) as Promise<Translated<T>>;
    }

    async updateOne(
      filter: FilterQuery<T> & { translations: unknown },
      data: EntityData<T>,
    ): Promise<Translated<T>> {
      const entity: MaybeTranslatable<T, P> = await this.findOneOrFail(filter);

      if (this._translationRepo && entity.translations) {
        const [translation] = entity.translations;

        const newTranslationData = this._translationRepo.create(data);

        this._translationRepo.assign(translation, newTranslationData);
      }

      /**
       *  Already translated, because under the hood updateOne uses findOneOrFail
       *  which is translating it
       *  */
      return super.updateOne(entity as never, entity) as Promise<Translated<T>>;
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

  return TranslationsMixin;
};
