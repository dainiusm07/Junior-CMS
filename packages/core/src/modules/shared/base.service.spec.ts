import { EntityRepository, NotFoundError } from "@mikro-orm/core";
import { getRepositoryToken } from "@mikro-orm/nestjs";
import { Test } from "@nestjs/testing";

import { mockEntities } from "../../test-utils/mock-entities";
import { mockRepository } from "../../test-utils/mock-repository";

import { BaseEntity } from "./base.entity";
import { BaseService } from "./base.service";

class MyBaseEntity extends BaseEntity {}

const entities = mockEntities(
  [
    {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  MyBaseEntity
);

describe("BaseService", () => {
  let service: MyBaseService;
  let repo: EntityRepository<BaseEntity>;

  class MyBaseService extends BaseService<BaseEntity> {
    constructor(private baseRepo: EntityRepository<BaseEntity>) {
      super(baseRepo, "Base");
    }
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(BaseEntity),
          useValue: mockRepository(MyBaseEntity),
        },
      ],
    }).compile();

    repo = moduleRef.get(getRepositoryToken(BaseEntity));
    service = new MyBaseService(repo);
  });

  describe("instance", () => {
    it("should be defined", () => {
      expect(service).toBeDefined();
    });
  });

  describe("findOne", () => {
    it("should return entity", async () => {
      jest.spyOn(repo, "findOne").mockReturnValue(Promise.resolve(entities[0]));

      const result = await service.findOne({});

      expect(result).toBeInstanceOf(MyBaseEntity);
      expect(result).toBe(entities[0]);
    });
  });

  describe("findOneOrFail", () => {
    it("should return entity", async () => {
      jest.spyOn(repo, "findOne").mockReturnValue(Promise.resolve(entities[0]));

      const result = await service.findOne({});

      expect(result).toBeInstanceOf(MyBaseEntity);
      expect(result).toBe(entities[0]);
    });

    it("should throw error", async () => {
      jest.spyOn(repo, "findOne").mockReturnValue(Promise.resolve(null));

      try {
        await service.findOneOrFail({});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError);
      }
    });
  });

  describe("updateOne", () => {
    const entity = entities[1];

    beforeEach(() => {
      jest.spyOn(repo, "findOne").mockReturnValue(Promise.resolve(entity));
    });

    it("should try to get entity first", async () => {
      await service.updateOne({}, {});

      expect(repo.findOne).toBeCalled();
    });

    it("should return updated entity", async () => {
      const update = { id: 999 };

      const result = await service.updateOne({}, update);

      expect(result).toBe(Object.assign(entity, update));
    });
  });

  describe("updateMany", () => {
    beforeEach(() => {
      jest.spyOn(repo, "find").mockReturnValue(Promise.resolve(entities));
    });

    it("should get entities first", async () => {
      await service.updateMany({}, {});

      expect(repo.find).toBeCalled();
    });

    it("should return updated entities", async () => {
      const update = { id: 999 };
      const updatedEntities = mockEntities(
        entities.map((entity) => ({ ...entity, ...update })),
        MyBaseEntity
      );

      const result = await service.updateMany({}, update);

      expect(result).toStrictEqual(updatedEntities);
    });
  });

  describe("insert", () => {
    it("should save entity to database", async () => {
      await service.insert({});

      expect(repo.persistAndFlush).toBeCalled();
    });

    it("should return entity", async () => {
      const result = await service.insert(entities[0]);

      expect(result).toBeInstanceOf(MyBaseEntity);
      expect(result).toEqual(entities[0]);
    });
  });
});
