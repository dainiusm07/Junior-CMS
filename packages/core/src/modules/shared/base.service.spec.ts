import { EntityRepository, NotFoundError } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test } from '@nestjs/testing';

import {
  DEFAULT_RESULTS_PER_PAGE_LIMIT,
  MAX_RESULTS_PER_PAGE_LIMIT,
} from '../../common/constants';
import { mockEntities } from '../../test-utils/mock-entities';
import { mockRepository } from '../../test-utils/mock-repository';
import { BaseEntity } from './base.entity';
import { BaseService } from './base.service';
import { IListResponse, SortOrder } from './list-utils';

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
  MyBaseEntity,
);

describe('BaseService', () => {
  let service: MyBaseService;
  let repo: EntityRepository<BaseEntity>;

  class MyBaseService extends BaseService<BaseEntity> {
    constructor(protected _repo: EntityRepository<BaseEntity>) {
      super();
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

  describe('instance', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('findList', () => {
    const listResponse: IListResponse<MyBaseEntity> = {
      items: entities,
      pagination: { currentPage: 1, totalPages: 1 },
      totalItems: entities.length,
    };

    beforeEach(() => {
      jest
        .spyOn(repo, 'findAndCount')
        .mockReturnValue(Promise.resolve([entities, entities.length]));
    });

    it('should return list results', async () => {
      const result = await service.findList({
        limit: entities.length,
        page: 1,
        filter: {},
        sort: {},
      });

      expect(result).toStrictEqual(listResponse);
    });

    [
      {
        description:
          'should set limit to default value when requested limit less or equal to 0',
        limit: 0,
        expectedValue: DEFAULT_RESULTS_PER_PAGE_LIMIT,
      },
      {
        description:
          'should set limit to default value when requested limit is bigger than max limit',
        limit: MAX_RESULTS_PER_PAGE_LIMIT + 1,
        expectedValue: DEFAULT_RESULTS_PER_PAGE_LIMIT,
      },
      {
        description: 'should not modify limit when given limit is good',
        limit: 15,
        expectedValue: 15,
      },
    ].forEach(({ description, limit, expectedValue }) => {
      it(description, () => {
        const findAndCount = jest.spyOn(repo, 'findAndCount');

        service.findList({ limit, page: 1, filter: {}, sort: {} });

        const { limit: calledWithLimit } = findAndCount.mock.calls[0][1] as any;
        expect(calledWithLimit).toBe(expectedValue);
      });
    });

    it('should set page to 1 if requested page number is less than 1', async () => {
      const result = await service.findList({
        limit: 1,
        page: 0,
        filter: {},
        sort: {},
      });

      expect(result.pagination.currentPage).toBe(1);
    });

    it('should set page to 1 if requested page number is less than 1', async () => {
      const result = await service.findList({
        limit: 1,
        page: 0,
        filter: {},
        sort: {},
      });

      expect(result.pagination.currentPage).toBe(1);
    });

    it('should return correct totalPages', async () => {
      const limit = 12;
      const totalItems = 13;
      const totalPages = 2;
      jest
        .spyOn(repo, 'findAndCount')
        .mockReturnValue(Promise.resolve([entities, totalItems]));

      const result = await service.findList({
        limit,
        page: 1,
        filter: {},
        sort: {},
      });

      expect(result.pagination.totalPages).toBe(totalPages);
    });

    it(`if page number is more than total pages should call self
        with same params and page=1`, async () => {
      const findList = jest.spyOn(service, 'findList');
      const listOptions = {
        limit: entities.length,
        page: 99,
        filter: {},
        sort: {},
      };

      await service.findList(listOptions);

      expect(findList).toBeCalledTimes(2);

      expect((findList.mock as any).calls.pop()[0]).toStrictEqual({
        ...listOptions,
        page: 1,
      });
    });

    [
      {
        description: 'should order by sort input',
        sort: {
          id: SortOrder.DESC,
        },
        expected: {
          id: SortOrder.DESC,
        },
      },
      {
        description: 'should order by sort input and add default sorting',
        sort: {
          email: SortOrder.DESC,
        },
        expected: {
          email: SortOrder.DESC,
          id: SortOrder.ASC,
        },
      },
      {
        description: 'should order by default sorting',
        sort: {},
        expected: {
          id: SortOrder.ASC,
        },
      },
      {
        description:
          'should order by default sorting and remove fields with null values',
        sort: { id: null, createdAt: null },
        expected: {
          id: SortOrder.ASC,
        },
      },
    ].forEach(({ description, sort, expected }) => {
      it(description, async () => {
        const findAndCount = jest.spyOn(repo, 'findAndCount');

        await service.findList({
          limit: 1,
          page: 1,
          sort,
          filter: {},
        });

        const { orderBy } = findAndCount.mock.calls[0][1] as any;
        expect(orderBy).toStrictEqual(expected);
      });
    });
  });

  describe('findOneOrFail', () => {
    it('should return entity', async () => {
      jest
        .spyOn(repo, 'findOneOrFail')
        .mockReturnValue(Promise.resolve(entities[0]));

      const result = await service.findOneOrFail({});

      expect(result).toBeInstanceOf(MyBaseEntity);
      expect(result).toBe(entities[0]);
    });

    it('should throw NotFoundError', async () => {
      jest.spyOn(repo, 'findOneOrFail').mockImplementation(() => {
        throw new NotFoundError('testing');
      });

      try {
        await service.findOneOrFail({});
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundError);
      }
    });
  });

  describe('updateOne', () => {
    const entity = entities[1];

    beforeEach(() => {
      jest
        .spyOn(service, 'findOneOrFail')
        .mockReturnValue(Promise.resolve(entity));
    });

    it('should try to fetch entity', async () => {
      await service.updateOne({}, {});

      expect(service.findOneOrFail).toBeCalledTimes(1);
    });

    it('should return updated entity', async () => {
      const update = { id: 999 };

      const result = await service.updateOne({}, update);

      expect(result).toBe(Object.assign(entity, update));
    });
  });

  describe('insert', () => {
    it('should save entity to database', async () => {
      await service.insert({});

      expect(repo.persistAndFlush).toBeCalled();
    });

    it('should return entity', async () => {
      jest
        .spyOn(service, 'findOneOrFail')
        .mockReturnValue(Promise.resolve(entities[0]));

      const result = await service.insert(entities[0]);

      expect(result).toBeInstanceOf(MyBaseEntity);
      expect(result).toEqual(entities[0]);
    });
  });
});
