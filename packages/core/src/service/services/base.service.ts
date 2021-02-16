import { FindOneOptions, Repository } from "typeorm";
import { MakeOptional } from "@junior-cms/common";

import { BaseKeys } from "../../types";

type Id = string | number;

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

  findOne(options: FindOneOptions<T>) {
    return this.repo.findOne(options);
  }
}
