import { Test } from "@nestjs/testing";
import { BaseService } from "./base.service";
import { Repository, UpdateResult } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { BaseEntity } from "../../entities/base/base.entity";

const updateResults: UpdateResult[] = [
  { affected: 1, generatedMaps: [], raw: [] },
  { affected: 0, generatedMaps: [], raw: [] },
];

const entities: BaseEntity[] = [
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
];

describe("BaseService tests", () => {
  let service: MyBaseService;
  let repo: Repository<BaseEntity>;

  class MyBaseService extends BaseService<BaseEntity> {
    constructor(private baseRepo: Repository<BaseEntity>) {
      super(baseRepo);
    }
  }

  class MyBaseEntity extends BaseEntity {}

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(BaseEntity),
          useValue: {
            update: jest.fn().mockReturnValue(updateResults[0]),
            create: jest.fn().mockReturnValue(new MyBaseEntity()),
            find: jest.fn().mockReturnValue(entities),
            save: jest.fn().mockImplementation((args) => {
              return Object.assign(new MyBaseEntity(), args);
            }),
          },
        },
      ],
    }).compile();

    repo = moduleRef.get(getRepositoryToken(BaseEntity));
    service = new MyBaseService(repo);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should perform update query", async () => {
    await service.update(1, {});
    expect(repo.update).toBeCalled();
  });

  [
    {
      updateResult: updateResults[0],
      shouldReturn: true,
    },
    {
      updateResult: updateResults[1],
      shouldReturn: false,
    },
  ].forEach(({ shouldReturn, updateResult }) => {
    it(`update return should be ${shouldReturn}`, async () => {
      jest
        .spyOn(repo, "update")
        .mockReturnValueOnce(Promise.resolve(updateResult));

      const result = await service.update(1, {});
      expect(result).toBe(shouldReturn);
    });
  });

  it("should return one entity", async () => {
    const result = await service.findOne({ where: {} });
    expect(result).toBe(entities[0]);
  });

  it("should perform save operation", async () => {
    await service.create({});
    expect(repo.save).toBeCalled();
  });

  it("should create and return entity", async () => {
    const entity = entities[0];

    const result = await service.create(entity);

    expect(result instanceof BaseEntity).toBe(true);
    expect(result).toEqual(entity);
  });
});
