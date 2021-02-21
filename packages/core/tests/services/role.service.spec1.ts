import { Permission } from "@junior-cms/common";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { mockEntities } from "../helpers/mock-entities";
import { IPermissionDefinition } from "../../src/config/permissions/generate-permissions";
import { RoleEntity } from "../../src/entities/role/role.entity";
import { RoleService } from "../../src/service";

const permissionsGetter = jest.fn();
jest.mock("../../src/config/permissions", () => ({
  get permissions() {
    return permissionsGetter();
  },
}));

const mockedRoles = mockEntities(
  [
    {
      id: 1,
      name: "role1",
      description: "testing",
      permissions: [Permission.Owner],
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      id: 2,
      name: "role2",
      description: "testing",
      permissions: [
        Permission.CreateUser,
        Permission.ReadUser,
        Permission.ReadUsers,
      ],
      updatedAt: new Date(),
      createdAt: new Date(),
    },
  ],
  RoleEntity
);

const mockedPermissions: IPermissionDefinition[] = [
  {
    group: 1,
    description: "Allows something",
    name: "Permission1",
    assignable: false,
  },
  {
    group: 2,
    description: "Allows something else",
    name: "Permission2",
    assignable: true,
  },
  {
    group: 3,
    description: "Allows more",
    name: "Permission3",
    assignable: true,
  },
];

describe("RoleService", () => {
  let service: RoleService;
  let repo: Repository<RoleEntity>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: getRepositoryToken(RoleEntity),
          useValue: {
            find: jest.fn().mockReturnValue(mockedRoles),
          },
        },
      ],
    }).compile();

    service = moduleRef.get(RoleService);
    repo = moduleRef.get(getRepositoryToken(RoleEntity));
  });

  describe("instance", () => {
    it("should be defined", () => {
      expect(service).toBeDefined();
    });
  });

  describe("findMany", () => {
    it("should return roles", async () => {
      const result = await service.findMany();

      expect(result).toBe(mockedRoles);
    });

    it("should return array", async () => {
      jest.spyOn(repo, "find").mockReturnValue(Promise.resolve([]));

      const result = await service.findMany();

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("getAssignablePermissions", () => {
    beforeAll(() => {
      permissionsGetter.mockReturnValue(mockedPermissions);
    });

    it("should not contain non assignable permissions", () => {
      const permissions = service.getAssignablePermissions();

      expect(permissions).toStrictEqual(mockedPermissions.slice(1));
    });
  });
});
