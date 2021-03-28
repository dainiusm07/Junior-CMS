import {
  EntityData,
  EntityRepository,
  FilterQuery,
  FindOneOptions,
} from '@mikro-orm/core';

import {
  MAX_RESULTS_PER_PAGE_LIMIT,
  DEFAULT_RESULTS_PER_PAGE_LIMIT,
} from '../../common/constants';
import {
  IListOptions,
  IListResponse,
  parseFilterInput,
  parseSortInput,
} from './list-utils';

export abstract class BaseService<T extends object> {
  protected abstract _repo: EntityRepository<T>;

  async findOneOrFail(where: FilterQuery<T>, options?: FindOneOptions<T>) {
    return this._repo.findOneOrFail(where, options);
  }

  async findList(options: IListOptions<T>): Promise<IListResponse<T>> {
    const { filter: rawFilter, sort } = options;
    let { page, limit } = options;

    page = page > 0 ? page : 1;
    if (limit <= 0 || limit > MAX_RESULTS_PER_PAGE_LIMIT) {
      limit = DEFAULT_RESULTS_PER_PAGE_LIMIT;
    }

    const filter = parseFilterInput(rawFilter);
    const orderBy = parseSortInput(sort);

    const [items, totalItems] = await this._repo.findAndCount(filter, {
      offset: (page - 1) * limit,
      limit,
      orderBy,
    });

    const totalPages = Math.ceil(totalItems / limit) || 1;

    if (totalPages < page) {
      return this.findList({ ...options, page: 1 });
    }

    return {
      items,
      totalItems,
      pagination: {
        currentPage: page,
        totalPages,
      },
    };
  }

  async insert(data: EntityData<T>) {
    this.deleteUndefinedProperties(data);

    const entity = this._repo.create(data);

    await this._repo.persistAndFlush(entity);

    return this.findOneOrFail(entity);
  }

  async updateOne(filter: FilterQuery<T>, data: EntityData<T>) {
    this.deleteUndefinedProperties(data);

    const entity = await this.findOneOrFail(filter);

    this._repo.assign(entity, data);

    await this._repo.persistAndFlush(entity);

    return entity;
  }

  protected deleteUndefinedProperties<T extends Record<string, unknown>>(
    obj: T,
  ) {
    Object.entries(obj).forEach(([key, value]) => {
      if (value === undefined) {
        delete obj[key];
      }
    });
  }
}
