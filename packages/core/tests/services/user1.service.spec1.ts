import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { mockEntities } from "../helpers/mock-entities";

import { UserRolesEntity } from "../../src/entities/user/user-roles.entity";
import { UserEntity } from "../../src/entities/user/user.entity";
import { UserService } from "../../src/service";

export const ManyToMany = jest.fn((callback) => callback());

const usersMock = mockEntities(
  [
    {
      id: 1,
      email: "test@gmail.com",
      firstname: "Will",
      lastname: "Smith",
      password: "password",
      roles: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: 2,
      email: "test2@gmail.com",
      firstname: "John",
      lastname: "Peterson",
      password: "john11",
      roles: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ],
  UserEntity
);

describe("UserService tests", () => {
  let service: UserService;
  let userRepo: Repository<UserEntity>;
  let userRolesRepo: Repository<UserRolesEntity>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            find: jest.fn().mockReturnValue(usersMock),
            findOne: jest.fn().mockReturnValue(usersMock[0]),
          },
        },
        {
          provide: getRepositoryToken(UserRolesEntity),
          useValue: {
            createQueryBuilder: jest.fn().mockReturnThis(),
            insert: jest.fn().mockReturnThis(),
            values: jest.fn().mockReturnThis(),
            orIgnore: jest.fn().mockReturnThis(),
            execute: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get(UserService);
    userRolesRepo = moduleRef.get(getRepositoryToken(UserRolesEntity));
    userRepo = moduleRef.get(getRepositoryToken(UserEntity));
  });

  describe("instance", () => {
    it("should be defined", () => {
      expect(service).toBeDefined();
    });
  });

  describe("findOne", () => {
    it("should return one user", async () => {
      const user = await service.findOne({});

      expect(usersMock).toContain(user);
      expect(user).toBeInstanceOf(UserEntity);
    });

    it("should load user roles", async () => {
      const options = {};

      await service.findOne(options);

      expect(userRepo.find).toBeCalledWith({
        relations: ["roles"],
        ...options,
      });
    });
  });

  describe("findMany", () => {
    it("should return many users", async () => {
      const users = await service.findMany();
      expect(users).toBe(usersMock);
    });

    it("should return array", async () => {
      const users = await service.findMany();
      expect(Array.isArray(users)).toBe(true);
    });
  });

  describe("assignRoles", () => {
    it(`should assign roles`, async () => {
      const rolesIds = [1, 2, 3];
      await service.assignRoles(rolesIds, { assignedBy: 1, userId: 1 });

      expect(userRolesRepo.createQueryBuilder().execute).toBeCalled();
      expect(userRolesRepo.delete).toBeCalled();
    });
    it(`should not assign roles`, async () => {
      const rolesIds = undefined;

      await service.assignRoles(rolesIds, { assignedBy: 1, userId: 1 });

      expect(userRolesRepo.createQueryBuilder().execute).not.toBeCalled();
      expect(userRolesRepo.delete).not.toBeCalled();
    });
  });
});
