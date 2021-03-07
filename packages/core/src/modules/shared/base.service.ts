import {
  EntityData,
  EntityRepository,
  FilterQuery,
  FindOptions,
  Populate,
  Primary,
} from "@mikro-orm/core";

import { BaseEntity } from "./base.entity";
import { IListOptions, IListResponse, SortOrder } from "./list-utils";
import { NotFoundError } from "../../common/errors/not-found.error";

export abstract class BaseService<T extends BaseEntity> {
  constructor(private repo: EntityRepository<T>, private name: string) {}

  getReference(id: Primary<T>) {
    return this.repo.getReference(id);
  }

  findOne(where: FilterQuery<T>, populate?: any) {
    return this.repo.findOne(where, populate);
  }

  async findOneOrFail(where: FilterQuery<T>, populate?: any) {
    return this.findOne(where, populate).then((res) => {
      if (!res) return new NotFoundError(this.name);
      return res;
    });
  }

  findAll(options?: FindOptions<T, Populate<T>>) {
    return this.repo.findAll(options);
  }

  async findList(options: IListOptions<T>): Promise<IListResponse<T>> {
    let { filter, page, limit, sort } = options;

    page = page > 0 ? page : 1;

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
    const entity = this.repo.create(data);

    await this.repo.persistAndFlush(entity);
    return entity;
  }

  async updateOne(filter: FilterQuery<T>, data: EntityData<T>) {
    const entity = await this.findOneOrFail(filter);

    if (entity instanceof NotFoundError) {
      return entity;
    }

    this.repo.assign(entity, data);

    await this.repo.persistAndFlush(entity);
    return entity;
  }

  async updateMany(filter: FilterQuery<T>, data: EntityData<T>) {
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
