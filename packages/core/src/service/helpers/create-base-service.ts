import { DeepPartial, ObjectLiteral, Repository } from "typeorm";

type Id = number | string;

const createBaseService = <T extends ObjectLiteral>(
  Entity: new (...args: any) => T
) => {
  abstract class BaseService {
    constructor(private repo: Repository<T>) {}

    async update(id: Id, input: DeepPartial<T>): Promise<T> {
      const updateResult = await this.repo
        .createQueryBuilder()
        .update(Entity, Object.assign(new Entity(), input))
        .where("id = :id", { id })
        .execute();

      if (!updateResult.affected) {
        return null;
      }

      return this.repo.findOne(id);
    }

    create(input: T): Promise<T> {
      return this.repo.save(Object.assign(new Entity(), input));
    }

    findOneById(id: Id) {
      return this.repo.findOne(id);
    }
  }

  return BaseService;
};

export default createBaseService;
