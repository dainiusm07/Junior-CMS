import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserRolesEntity } from "../../entities/user/user-roles.entity";
import { UserEntity } from "../../entities/user/user.entity";
import { UserService } from "./user.service";

export const ManyToMany = jest.fn((callback) => callback());

const usersMock = [
  {
    id: 1,
    email: "test@gmail.com",
  },
  {
    id: 2,
    email: "test2@gmail.com",
  },
] as UserEntity[];

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

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return one user", async () => {
    const user = await service.findOne({});
    expect(usersMock).toContain(user);
  });

  it("when fetching user it should load user roles", async () => {
    const options = {};

    await service.findOne(options);

    expect(userRepo.find).toBeCalledWith({
      relations: ["roles"],
      ...options,
    });
  });

  it("should return many users", async () => {
    const users = await service.findMany();
    expect(users).toBe(usersMock);
  });

  [
    {
      shouldAssign: true,
      rolesIds: [1, 2, 3],
    },
    {
      shouldAssign: false,
      rolesIds: undefined,
    },
  ].forEach(({ shouldAssign, rolesIds }) => {
    it(`should ${shouldAssign ? "" : "not "}assign roles`, async () => {
      await service.assignRoles(rolesIds, { assignedBy: 1, userId: 1 });

      if (shouldAssign) {
        expect(userRolesRepo.createQueryBuilder().execute).toBeCalled();
        expect(userRolesRepo.delete).toBeCalled();
      } else {
        expect(userRolesRepo.createQueryBuilder().execute).not.toBeCalled();
        expect(userRolesRepo.delete).not.toBeCalled();
      }
    });
  });
});
