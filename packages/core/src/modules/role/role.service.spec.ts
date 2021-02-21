import { EntityRepository } from "@mikro-orm/core";
import { getRepositoryToken } from "@mikro-orm/nestjs";
import { Test } from "@nestjs/testing";
import { UserEntity } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { RoleEntity } from "./role.entity";
import { RoleService } from "./role.service";

describe("RoleService", () => {
  let roleService: RoleService;
  let roleRepo: EntityRepository<RoleEntity>;

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
    roleRepo = moduleRef.get(getRepositoryToken(RoleEntity));
  });

  describe("instance", () => {
    it("should be defined", () => {
      expect(roleService).toBeDefined();
    });
  });
});
