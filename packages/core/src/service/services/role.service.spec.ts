import { Permission } from "@junior-cms/common";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { RoleEntity } from "../../entities/role/role.entity";
import { RoleService } from "./role.service";

const roles: RoleEntity[] = [
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
];

const permissions = [
  {
    name: "Permission1",
    assignable: false,
  },
  {
    name: "Permission2",
    assignable: true,
  },
];

describe("RoleService test", () => {
  let service: RoleService;

  beforeEach(async () => {
    const mockPerms = require("../../config/permissions");
    mockPerms.permissions = permissions;

    const moduleRef = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: getRepositoryToken(RoleEntity),
          useValue: {
            find: jest.fn().mockReturnValue(roles),
          },
        },
      ],
    }).compile();
    service = moduleRef.get(RoleService);
  });

  it("should return roles", async () => {
    const result = await service.findMany();
    expect(result).toBe(roles);
  });

  it("should not contain non assignable permissions", () => {
    expect(service.getAssignablePermissions()).not.toContain(permissions[0]);
  });
});
