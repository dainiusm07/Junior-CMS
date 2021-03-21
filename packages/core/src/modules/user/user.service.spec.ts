import { EntityRepository, LoadStrategy } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test } from '@nestjs/testing';
import { mockEntities } from '../../test-utils/mock-entities';
import { mockRepository } from '../../test-utils/mock-repository';

import { User } from './user.entity';
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
  User,
);

describe('UserService tests', () => {
  let service: UserService;
  let repo: EntityRepository<User>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(User),
        },
      ],
    }).compile();

    service = moduleRef.get(UserService);
    repo = moduleRef.get(getRepositoryToken(User));
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

  describe('findOneOrFail', () => {
    it('should load user roles', async () => {
      const options = {};

      await service.findOneOrFail(options);

      expect(repo.findOneOrFail).toBeCalledWith(options, {
        populate: { role: LoadStrategy.JOINED },
      });
    });
  });
});
