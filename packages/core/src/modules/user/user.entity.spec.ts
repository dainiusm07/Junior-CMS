import { ChangeSet } from '@mikro-orm/core';

import { mockEntity } from '../../test-utils/mock-entities';
import { User } from './user.entity';

jest.mock('../../common/environment', () => ({ BCRYPT_SALT: 0 }));
let user: User;

const generateChangeSet = (payload: ChangeSet<User>['payload']) => {
  return {
    payload,
  };
};

describe('UserEntity', () => {
  beforeEach(() => {
    user = mockEntity(
      {
        password: 'currentPassword',
        firstname: 'will',
        lastname: 'smith',
      },
      User,
    );
  });

  describe('hashPassword', () => {
    it('should hash user password', async () => {
      const password = 'newPassword';
      const changeSet = generateChangeSet({ password });

      await (user as any).hashPassword({ changeSet });

      expect(user.password === password).toBe(false);
    });
    it('should not change user password', async () => {
      const changeSet = generateChangeSet({});
      const currentPassword = user.password;

      await (user as any).hashPassword({ changeSet });

      expect(user.password === currentPassword).toBe(true);
    });
  });

  describe('capitalize', () => {
    it('should set capitalized lastname and firstname', () => {
      const firstname = 'firstname';
      const capitalizedFirstname = 'Firstname';
      const lastname = 'lastname';
      const capitalizedLastname = 'Lastname';

      const changeSet = generateChangeSet({ firstname, lastname });

      (user as any).capitalize({ changeSet });

      expect(user.firstname === capitalizedFirstname).toBe(true);
      expect(user.lastname === capitalizedLastname).toBe(true);
    });

    it('should not capitalize lastname and firstname', () => {
      const { firstname, lastname } = user;
      const changeSet = generateChangeSet({});

      (user as any).capitalize({ changeSet });

      expect(user.firstname === firstname).toBe(true);
      expect(user.lastname === lastname).toBe(true);
    });
  });
});
