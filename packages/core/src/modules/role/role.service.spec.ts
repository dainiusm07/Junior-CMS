import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test } from '@nestjs/testing';
import { RoleEntity } from './role.entity';
import { RoleService } from './role.service';

describe('RoleService', () => {
  let roleService: RoleService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: getRepositoryToken(RoleEntity),
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    roleService = moduleRef.get(RoleService);
  });

  describe('instance', () => {
    it('should be defined', () => {
      expect(roleService).toBeDefined();
    });
  });
});
