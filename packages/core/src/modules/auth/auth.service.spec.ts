import bcrypt from 'bcrypt';
import { Test } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { mockEntity } from '../../test-utils/mock-entities';
import { UserService } from '../user/user.service';

const userMockPassword = 'password';

const userMock = mockEntity(
  {
    id: 1,
    email: 'test@test.com',
    firstname: 'Will',
    lastname: 'Smith',
    password: bcrypt.hashSync(userMockPassword, 0),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  User,
);

describe('AuthService', () => {
  let ctx: any;
  let authService: AuthService;
  let userService: UserService;

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
      ],
    }).compile();

    ctx = { req: { session: {} } };
    authService = moduleRef.get(AuthService);
    userService = moduleRef.get(UserService);
  });

  describe('instance', () => {
    it('should be defined', () => {
      expect(authService).toBeDefined();
    });
  });

  describe('validateUser', () => {
    [
      {
        password: userMockPassword,
        returnedUser: userMock,
        expectedResult: userMock,
      },
      {
        password: userMockPassword,
        returnedUser: null,
        expectedResult: null,
      },
      {
        password: 'wrong_password',
        returnedUser: userMock,
        expectedResult: null,
      },
    ].forEach(({ expectedResult, password, returnedUser }) => {
      it(`should ${expectedResult ? '' : 'not '}return user`, async () => {
        jest
          .spyOn(userService, 'findOne')
          .mockReturnValue(Promise.resolve(returnedUser));

        const result = await authService.validateUser({
          email: 'testing@test.com',
          password,
        });

        expect(result).toBe(expectedResult);
      });
    });

    it('should return instance of UserEntity', async () => {
      jest
        .spyOn(userService, 'findOne')
        .mockReturnValue(Promise.resolve(userMock));

      const result = await authService.validateUser({
        email: '',
        password: userMockPassword,
      });
      expect(result).toBeInstanceOf(User);
    });
  });

  describe('loginUser', () => {
    it('should set session userId', () => {
      authService.loginUser(ctx, userMock);

      expect((authService as any).getUserId(ctx)).toBe(userMock.id);
    });
  });

  describe('logoutUser', () => {
    it('should set session userId to null', () => {
      authService.logoutUser(ctx);

      expect((authService as any).getUserId(ctx)).toBe(null);
    });
  });

  describe('getCurrentUser', () => {
    it('should return null if userId is not set', async () => {
      const result = await authService.getCurrentUser(ctx);

      expect(result).toBe(null);
    });

    it('should return user if userId is set', async () => {
      authService.loginUser(ctx, userMock);
      jest
        .spyOn(userService, 'findOne')
        .mockReturnValue(Promise.resolve(userMock));

      const result = await authService.getCurrentUser(ctx);

      expect(result).toBe(userMock);
    });
  });
});
