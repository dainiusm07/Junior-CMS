import { EntityRepository, LoadStrategy } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test } from '@nestjs/testing';
import { mockEntities } from '../../test-utils/mock-entities';

import { UserEntity } from './user.entity';
import { UserService } from './user.service';

const usersMock = mockEntities(
  [
    {
      id: 1,
      email: 'test@gmail.com',
      firstname: 'Will',
      lastname: 'Smith',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: 2,
      email: 'test2@gmail.com',
      firstname: 'John',
      lastname: 'Peterson',
      password: 'john11',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ],
  UserEntity,
);

describe('UserService tests', () => {
  let service: UserService;
  let repo: EntityRepository<UserEntity>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get(UserService);
    repo = moduleRef.get(getRepositoryToken(UserEntity));
  });

  describe('instance', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('findOne', () => {
    it('should load user roles', async () => {
      const options = {};

      await service.findOne(options);

      expect(repo.findOne).toBeCalledWith(options, {
        populate: { role: LoadStrategy.JOINED },
      });
    });
  });

  describe('find', () => {
    beforeEach(() => {
      jest.spyOn(repo, 'find').mockReturnValue(Promise.resolve(usersMock));
    });

    it('should return many users', async () => {
      const users = await service.find({});

      expect(users).toBe(usersMock);
    });

    it('should return array', async () => {
      const users = await service.find({});

      expect(Array.isArray(users)).toBe(true);
    });
  });
});
