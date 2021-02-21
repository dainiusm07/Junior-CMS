import bcrypt from "bcrypt";
import { Test } from "@nestjs/testing";

import { AuthService } from "../../src/service/services/auth.service";
import { UserService } from "../../src/service/services/user.service";
import { SessionService } from "../../src/service/services/session.service";
import { UserEntity } from "../../src/entities/user/user.entity";
import { mockEntity } from "../helpers/mock-entities";

const userMockPassword = "password";

const userMock = mockEntity(
  {
    id: 1,
    email: "test@test.com",
    firstname: "Will",
    lastname: "Smith",
    roles: [],
    password: bcrypt.hashSync(userMockPassword, 0),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  UserEntity
);

describe("AuthService", () => {
  let service: AuthService;
  let userService: UserService;
  let sessionService: SessionService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: SessionService,
          useValue: {
            setUserId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get(AuthService);
    userService = moduleRef.get(UserService);
    sessionService = moduleRef.get(SessionService);
  });

  describe("instance", () => {
    it("should be defined", () => {
      expect(service).toBeDefined();
    });
  });

  describe("validateUser", () => {
    [
      {
        password: userMockPassword,
        returnedUser: userMock,
        expectedResult: userMock,
      },
      {
        password: userMockPassword,
        returnedUser: undefined,
        expectedResult: null,
      },
      {
        password: "wrong_password",
        returnedUser: userMock,
        expectedResult: null,
      },
    ].forEach(({ expectedResult, password, returnedUser }) => {
      it(`should ${expectedResult ? "" : "not "}return user`, async () => {
        jest
          .spyOn(userService, "findOne")
          .mockReturnValue(Promise.resolve(returnedUser));

        const result = await service.validateUser({
          email: "testing@test.com",
          password,
        });

        expect(result).toBe(expectedResult);
      });
    });

    it("should return instance of UserEntity", async () => {
      jest
        .spyOn(userService, "findOne")
        .mockReturnValue(Promise.resolve(userMock));

      const result = await service.validateUser({
        email: "",
        password: userMockPassword,
      });
      expect(result).toBeInstanceOf(UserEntity);
    });
  });

  describe("loginUser", () => {
    it("should login user by id", () => {
      service.loginUser(userMock);
      expect(sessionService.setUserId).toHaveBeenCalledWith(userMock.id);
    });
  });

  describe("logoutUser", () => {
    it("should logout user by setting userId to null", () => {
      service.logoutUser();
      expect(sessionService.setUserId).toHaveBeenCalledWith(null);
    });
  });
});
