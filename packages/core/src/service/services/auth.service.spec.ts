import bcrypt from "bcrypt";
import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { SessionService } from "./session.service";
import { UserEntity } from "../../entities/user/user.entity";

const userMock = {
  id: 1,
  email: "test@test.com",
  password: bcrypt.hashSync("test_password", 0),
} as UserEntity;

describe("AuthService tests", () => {
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

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  [
    {
      password: "test_password",
      returnedUser: userMock,
      expectedResult: userMock,
    },
    {
      password: "test_password",
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
        email: "",
        password,
      });

      expect(result).toBe(expectedResult);
    });
  });

  it("should login user by id", () => {
    service.loginUser(userMock);
    expect(sessionService.setUserId).toHaveBeenCalledWith(userMock.id);
  });

  it("should logout user by setting userId to null", () => {
    service.logoutUser();
    expect(sessionService.setUserId).toHaveBeenCalledWith(null);
  });
});
