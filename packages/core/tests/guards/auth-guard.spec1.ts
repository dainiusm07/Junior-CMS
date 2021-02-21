import { Permission } from "@junior-cms/common";
import { Test } from "@nestjs/testing";
import { Reflector } from "@nestjs/core";
jest.mock("@nestjs/graphql");
import { GqlExecutionContext } from "@nestjs/graphql";

import { UserEntity } from "../../src/entities/user/user.entity";
import { AuthGuard } from "../../src/api/guards/auth-guard";
import { UserService } from "../../src/service";
import { MockExecutionContext } from "../mocks/execution-context.mock";

const { ReadUser, ReadUsers, Owner } = Permission;

let authGuard: AuthGuard;
let userService: UserService;
let reflector: Reflector;

const mockUserWithPermissions = (rolesPermissions: Permission[][]) => {
  const user = {
    roles: rolesPermissions.map((permissions) => ({ permissions })),
  } as UserEntity;

  jest.spyOn(userService, "findOne").mockReturnValue(Promise.resolve(user));

  return user;
};

const mockContextWithUserId = (userId: number) => {
  const context = { req: { session: { userId } } };
  jest.spyOn(GqlExecutionContext, "create").mockReturnValue({
    getContext: jest.fn().mockReturnValue(context),
  } as any);
  return context as any;
};

const mockRequiredPermissions = (permissions: Permission[] | undefined) => {
  jest.spyOn(reflector, "get").mockReturnValue(permissions);
};

describe("AuthGuard", () => {
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: Reflector,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    authGuard = moduleRef.get(AuthGuard);
    userService = moduleRef.get(UserService);
    reflector = moduleRef.get(Reflector);
  });

  describe("user is logged in", () => {
    it(`if doesn't have required permissions
        should return false`, async () => {
      mockUserWithPermissions([[]]);
      mockRequiredPermissions([ReadUser]);
      mockContextWithUserId(1);

      const canActivate = await authGuard.canActivate(MockExecutionContext);

      expect(canActivate).toBe(false);
    });
    it(`if has only part of required permissions
        should return false`, async () => {
      mockUserWithPermissions([[ReadUser]]);
      mockRequiredPermissions([ReadUser, ReadUsers]);
      mockContextWithUserId(1);

      const canActivate = await authGuard.canActivate(MockExecutionContext);

      expect(canActivate).toBe(false);
    });

    it(`if has required permissions should return true`, async () => {
      mockUserWithPermissions([[ReadUser]]);
      mockRequiredPermissions([ReadUser]);
      mockContextWithUserId(1);

      const canActivate = await authGuard.canActivate(MockExecutionContext);

      expect(canActivate).toBe(true);
    });

    it(`if has required permissions but those are in
        different roles should return true`, async () => {
      mockUserWithPermissions([[ReadUser], [ReadUsers]]);
      mockRequiredPermissions([ReadUser, ReadUsers]);
      mockContextWithUserId(1);

      const canActivate = await authGuard.canActivate(MockExecutionContext);

      expect(canActivate).toBe(true);
    });

    it(`if has owner permission should return true`, async () => {
      mockUserWithPermissions([[Owner]]);
      mockRequiredPermissions([ReadUser, ReadUsers]);
      mockContextWithUserId(1);

      const canActivate = await authGuard.canActivate(MockExecutionContext);

      expect(canActivate).toBe(true);
    });

    it(`if has required permissions should attach
        user to context`, async () => {
      mockRequiredPermissions([]);
      const user = mockUserWithPermissions([[]]);
      const context = mockContextWithUserId(1);

      await authGuard.canActivate(MockExecutionContext);

      expect(context.user).toBe(user);
    });
  });

  describe("session userId is set", () => {
    beforeEach(() => {
      jest
        .spyOn(userService, "findOne")
        .mockReturnValue(Promise.resolve(undefined));
    });

    it(`if user with that id isn't found / is deleted
        should return false`, async () => {
      mockRequiredPermissions([]);
      mockContextWithUserId(1);

      const canActivate = await authGuard.canActivate(MockExecutionContext);

      expect(canActivate).toBe(false);
    });
  }),
    describe(`user isn't logged in`, () => {
      beforeEach(() => {
        jest
          .spyOn(userService, "findOne")
          .mockReturnValue(Promise.resolve(undefined));
      });

      it(`if permissions are not needed should return true`, async () => {
        mockRequiredPermissions(undefined);

        const canActivate = await authGuard.canActivate(MockExecutionContext);

        expect(canActivate).toBe(true);
      });

      it(`if permissions are needed should return false`, async () => {
        mockRequiredPermissions([]);

        const canActivate = await authGuard.canActivate(MockExecutionContext);

        expect(canActivate).toBe(false);
      });
    });
});
