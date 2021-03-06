import {
  EntityData,
  EntityRepository,
  FilterQuery,
  FindOptions,
  NotFoundError,
  Populate,
  Primary,
} from "@mikro-orm/core";

import { mapFilterOptions } from "../../utils/map-filter-options";
import { BaseEntity } from "./base.entity";
import { IListOptions, IListResponse } from "./list-utils";

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
      if (!res)
        throw new NotFoundError(`${this.name} not found`, {
          name: this.create({}).constructor.name,
        });
      return res;
    });
  }

  findAll(options?: FindOptions<T, Populate<T>>) {
    return this.repo.findAll(options);
  }

  async findList(options: IListOptions<T>): Promise<IListResponse<T>> {
    let { filter: rawFilter, page, limit } = options;
    /**
     * TODO: https://github.com/nestjs/graphql/issues/1096
     * NestJS graphql package is not mapping field values
     * by @Field name prop so for know parsing them with
     * mapFilterOptions function
     */
    const filter = mapFilterOptions(rawFilter || {}) as any;

    page = page > 0 ? page : 1;

    const [items, totalItems] = await this.repo.findAndCount(filter, {
      offset: (page - 1) * limit,
      limit,
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
}
