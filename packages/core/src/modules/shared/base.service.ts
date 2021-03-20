import {
  EntityData,
  EntityRepository,
  FilterQuery,
  FindOneOptions,
  FindOptions,
  Populate,
  Primary,
} from "@mikro-orm/core";

import { NotFoundError } from "../../common/errors/not-found.error";
import {
  MAX_RESULTS_PER_PAGE_LIMIT,
  DEFAULT_RESULTS_PER_PAGE_LIMIT,
} from "../../common/constants";
import { IListOptions, IListResponse, SortOrder } from "./list-utils";
import { deleteUndefinedProperties } from "../../utils/delete-undefined-properties";

export class BaseService<T extends object> {
  constructor(private repo: EntityRepository<T>, private name: string) {}

  getReference(id: Primary<T>) {
    return this.repo.getReference(id);
  }

  findOne(where: FilterQuery<T>, populate?: FindOneOptions<T, any>) {
    return this.repo.findOne(where, populate);
  }

  async findOneOrFail(
    where: FilterQuery<T>,
    populate?: FindOneOptions<T, any>
  ) {
    return this.findOne(where, populate).then((res) => {
      if (!res) return new NotFoundError(this.name);
      return res;
    });
  }

  find(where: FilterQuery<T>, options?: FindOptions<T, Populate<T>>) {
    return this.repo.find(where, options);
  }

  async findList(options: IListOptions<T>): Promise<IListResponse<T>> {
    let { filter, page, limit, sort } = options;

    page = page > 0 ? page : 1;
    if (limit <= 0 || limit > MAX_RESULTS_PER_PAGE_LIMIT) {
      limit = DEFAULT_RESULTS_PER_PAGE_LIMIT;
    }

    // TODO: Temporary solution
    filter = JSON.parse(JSON.stringify(filter || {}));

    const orderBy = this.getOrderBy(sort);

    const [items, totalItems] = await this.repo.findAndCount(filter || {}, {
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

  create(data: EntityData<T>) {
    return this.repo.create(data);
  }

  async insert(data: EntityData<Omit<T, "">>) {
    deleteUndefinedProperties(data);

    const entity = this.repo.create(data);

    await this.repo.persistAndFlush(entity);
    return entity;
  }

  async updateOne(filter: FilterQuery<T>, data: EntityData<T>) {
    deleteUndefinedProperties(data);

    const entity = await this.findOneOrFail(filter);

    if (entity instanceof NotFoundError) {
      return entity;
    }

    this.repo.assign(entity, data);

    await this.repo.persistAndFlush(entity);
    return entity;
  }

  async updateMany(filter: FilterQuery<T>, data: EntityData<T>) {
    deleteUndefinedProperties(data);

    const entities = await this.repo.find(filter);
    entities.forEach((entity) => this.repo.assign(entity, data));

    await this.repo.persistAndFlush(entities);
    return entities;
  }

  private getOrderBy(
    sort: Record<string, SortOrder | null | undefined> | null | undefined
  ) {
    const orderBy: Record<string, SortOrder> = {};
    if (sort) {
      Object.entries(sort)
        .reverse()
        .forEach(([field, value]) => {
          if (value) {
            orderBy[field] = value;
          }
        });
    }

    // Default sorting
    if (orderBy.id === undefined) {
      orderBy.id = SortOrder.ASC;
    }

    return orderBy;
  }
}
