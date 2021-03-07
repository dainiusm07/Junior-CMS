import { EntityRepository } from "@mikro-orm/core";
import { getRepositoryToken } from "@mikro-orm/nestjs";
import { Test } from "@nestjs/testing";
import { NotFoundError } from "../../common/errors/not-found.error";

import { mockEntities } from "../../test-utils/mock-entities";
import { mockRepository } from "../../test-utils/mock-repository";

import { BaseEntity } from "./base.entity";
import { BaseService } from "./base.service";
import { IListResponse, SortOrder } from "./list-utils";

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

  describe("getReference", () => {
    it("should call repository getReference method", () => {
      const getReference = jest.spyOn(repo, "getReference");

      service.getReference(1);

      expect(getReference).toBeCalled();
    });
  });

  describe("create", () => {
    it("should create entity instance", () => {
      const entity = {};

      const result = service.create(entity);

      expect(result).toBeInstanceOf(MyBaseEntity);
    });
  });

  describe("findList", () => {
    const listResponse: IListResponse<MyBaseEntity> = {
      items: entities,
      pagination: { currentPage: 1, totalPages: 1 },
      totalItems: entities.length,
    };

    beforeEach(() => {
      jest
        .spyOn(repo, "findAndCount")
        .mockReturnValue(Promise.resolve([entities, entities.length]));
    });

    it("should return list results", async () => {
      const result = await service.findList({
        limit: entities.length,
        page: 1,
      });

      expect(result).toStrictEqual(listResponse);
    });

    it("should set currentPage to 1 if given page is less than 1", async () => {
      const result = await service.findList({ limit: 1, page: 0 });

      expect(result.pagination.currentPage).toBe(1);
    });

    it("should return correct totalPages", async () => {
      const limit = 12;
      const totalItems = 13;
      const totalPages = 2;
      jest
        .spyOn(repo, "findAndCount")
        .mockReturnValue(Promise.resolve([entities, totalItems]));

      const result = await service.findList({ limit, page: 1 });

      expect(result.pagination.totalPages).toBe(totalPages);
    });

    it(`if page number is more than total pages should call self
        with same params and page=1`, async () => {
      const findList = jest.spyOn(service, "findList");
      const listOptions = { limit: entities.length, page: 99 };

      await service.findList(listOptions);

      expect(findList).toBeCalledTimes(2);
      expect(findList.mock.calls.pop()[0]).toStrictEqual({
        ...listOptions,
        page: 1,
      });
    });

    [
      {
        description: "should order by sort input",
        sort: {
          id: SortOrder.DESC,
        },
        expected: {
          id: SortOrder.DESC,
        },
      },
      {
        description: "should order by sort input and add default sorting",
        sort: {
          email: SortOrder.DESC,
        },
        expected: {
          email: SortOrder.DESC,
          id: SortOrder.ASC,
        },
      },
      {
        description: "should order by default sorting",
        sort: undefined,
        expected: {
          id: SortOrder.ASC,
        },
      },
    ].forEach(({ description, sort, expected }) => {
      it(description, async () => {
        const findAndCount = jest.spyOn(repo, "findAndCount");

        await service.findList({
          limit: 1,
          page: 1,
          sort,
        });

        const { orderBy } = findAndCount.mock.calls[0][1] as any;
        expect(orderBy).toStrictEqual(expected);
      });
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

    it("should return NotFoundError", async () => {
      jest.spyOn(repo, "findOne").mockReturnValue(Promise.resolve(null));

      const response = await service.findOneOrFail({});

      expect(response).toBeInstanceOf(NotFoundError);
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

    it("should return NotFoundError if entity is not found", async () => {
      jest.spyOn(repo, "findOne").mockReturnValue(Promise.resolve(null));

      const result = await service.updateOne({}, {});

      expect(result).toBeInstanceOf(NotFoundError);
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
