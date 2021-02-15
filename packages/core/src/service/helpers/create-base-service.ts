import { MakeOptional } from "@junior-cms/common";
import { FindOneOptions, ObjectLiteral, Repository } from "typeorm";
import { BaseEntity } from "../../entities/base/base.entity";

type Id = number | string;

type BaseKeys = keyof BaseEntity | "deletedAt";

const createBaseService = <T extends ObjectLiteral>(
  Entity: new (...args: any) => T
) => {
  abstract class BaseService {
    constructor(private repo: Repository<T>) {}

    async update(
      id: Id,
      input: MakeOptional<T, keyof T>
    ): Promise<T | undefined> {
      const updateResult = await this.repo
        .createQueryBuilder()
        .update(Entity, Object.assign(new Entity(), input))
        .where("id = :id", { id })
        .execute();

      if (!updateResult.affected) {
        return undefined;
      }

      return this.repo.findOne(id);
    }

    create(input: Omit<T, BaseKeys>): Promise<T> {
      return this.repo.save(Object.assign(new Entity(), input));
    }

    findOne(options: FindOneOptions<T>) {
      return this.repo.findOne(options);
    }

    findOneById(id: Id) {
      return this.repo.findOne(id);
    }
  }

  return BaseService;
};

export default createBaseService;
