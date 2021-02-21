import {
  EntityData,
  EntityRepository,
  FilterQuery,
  FindOptions,
  NotFoundError,
  Populate,
  wrap,
} from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";

export abstract class BaseService<T extends BaseEntity> {
  constructor(private repo: EntityRepository<T>, private name: string) {}

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

  create(data: EntityData<T>) {
    return this.repo.create(data);
  }

  async insert(data: EntityData<T>) {
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
