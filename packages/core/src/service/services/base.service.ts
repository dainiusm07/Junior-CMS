import { FindOneOptions, Repository } from "typeorm";
import { MakeOptional } from "@junior-cms/common";

import { BaseKeys, Relations } from "../../types";

type Id = string | number;

export interface BaseFindOneOptions<T = {}>
  extends Omit<FindOneOptions<T>, "relations"> {
  relations?: Relations<T>[];
}
export abstract class BaseService<T> {
  constructor(private repo: Repository<T>) {}

  async update(id: Id, input: MakeOptional<T, keyof T>): Promise<Boolean> {
    const updateResult = await this.repo.update(
      id,
      Object.assign(this.repo.create(), input)
    );

    return Boolean(updateResult.affected);
  }

  create(input: Omit<T, BaseKeys>): Promise<T> {
    return this.repo.save(Object.assign(this.repo.create(), input));
  }

  async findOne(options: BaseFindOneOptions<T>): Promise<T | undefined> {
    /**
     * TODO: Replace with findOne when it will be fixed
     *
     * https://github.com/typeorm/typeorm/issues/5694
     *  */
    const result = await this.repo.find(options as any);
    return result[0];
  }
}
