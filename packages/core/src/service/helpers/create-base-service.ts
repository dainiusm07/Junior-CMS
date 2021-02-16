import { MakeOptional } from "@junior-cms/common";
import { FindOneOptions, ObjectLiteral, Repository } from "typeorm";
import { BaseKeys } from "../../types";

type Id = number | string;

const createBaseService = <T extends ObjectLiteral>(
  Entity: new (...args: any) => T
) => {
  abstract class BaseService {
    constructor(private repo: Repository<T>) {}

    async update(id: Id, input: MakeOptional<T, keyof T>): Promise<Boolean> {
      const updateResult = await this.repo.update(
        id,
        Object.assign(new Entity(), input)
      );

      return Boolean(updateResult.affected);
    }

    create(input: Omit<T, BaseKeys>): Promise<T> {
      return this.repo.save(Object.assign(new Entity(), input));
    }

    findOne(options: FindOneOptions<T>) {
      return this.repo.findOne(options);
    }
  }

  return BaseService;
};

export default createBaseService;
