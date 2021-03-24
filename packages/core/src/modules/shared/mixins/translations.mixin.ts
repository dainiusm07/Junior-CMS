import {
  Constructor,
  EntityData,
  EntityRepository,
  FilterQuery,
  FindOneOptions,
  LoadStrategy,
} from '@mikro-orm/core';

import { DEFAULT_LANGUAGE_CODE } from '../../../common/environment';
import {
  MaybeTranslatable,
  Translatable,
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
    protected abstract _translationRepo: EntityRepository<P>;
    protected abstract _repo: EntityRepository<T>;

    async findOneOrFail(
      filter: FilterQuery<T>,
      options: FindOneOptions<T> = {},
    ): Promise<Translated<T>> {
      if (typeof options.populate === 'object') {
        Object.assign(options.populate, { translations: LoadStrategy.JOINED });
      } else {
        options.populate = { translations: LoadStrategy.JOINED };
      }

      return super
        .findOneOrFail(filter, options)
        .then((entity) => translateEntity(entity));
    }

    async findList(
      options: IListOptions<T>,
    ): Promise<IListResponse<Translated<T>>> {
      return super.findList(options).then((result) => {
        const items = result.items.map((item) => translateEntity(item));

        return {
          ...result,
          items,
        };
      });
    }

    async insert(data: EntityData<T>): Promise<Translated<T>> {
      const entity = this._repo.create(data);

      this._repo.assign(entity, {
        translations: [this._translationRepo.create(data)],
      });

      /**
       *  Already translated, because under the hood updateOne uses findOneOrFail
       *  which is translating it already
       *  */
      return super.insert(entity) as Promise<Translated<T>>;
    }

    async updateOne(
      filter: FilterQuery<T>,
      data: EntityData<T>,
      languageCode = DEFAULT_LANGUAGE_CODE,
    ): Promise<Translated<T>> {
      filter = this.transformFilter(filter);

      Object.assign(filter, { translations: { languageCode } });

      const entity: MaybeTranslatable<T, P> = await this.findOneOrFail(filter);

      if (this._translationRepo && entity.translations) {
        const [translation] = entity.translations;

        const newTranslationData = this._translationRepo.create(data);

        this._translationRepo.assign(translation, newTranslationData);
      }

      /**
       *  Already translated, because under the hood updateOne uses findOneOrFail
       *  which is translating it already
       *  */
      return super.updateOne(entity as never, entity) as Promise<Translated<T>>;
    }

    async addTranslation(translation: EntityData<P>) {
      this.deleteUndefinedProperties(translation);

      const entity = this._translationRepo.create(translation);

      await this._translationRepo.persistAndFlush(entity);

      return entity;
    }

    /**
     * Transforms FilterQuery to object
     */
    private transformFilter<K>(filter: FilterQuery<K>): FilterQuery<K> {
      if (
        typeof filter === 'number' ||
        (typeof filter === 'string' && typeof filter !== 'object')
      ) {
        return { id: filter } as never;
      }

      return filter;
    }
  }

  return TranslationsMixin;
};
