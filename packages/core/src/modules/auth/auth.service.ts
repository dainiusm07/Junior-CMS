import { compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { NativeAuthInput } from './dto/native-auth.input';
import { CmsContext } from '../../types/CmsContext';

type SessionData = {
  userId: User['id'] | null;
};

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  static async validatePassword(password: string, encryptedPassword: string) {
    return await compare(password, encryptedPassword);
  }

  private getSessionFromCtx(ctx: CmsContext) {
    return (ctx.req.session as unknown) as SessionData;
  }

  private assignToSession(ctx: CmsContext, data: unknown) {
    const session = this.getSessionFromCtx(ctx);
    Object.assign(session, data);
  }

  private getUserId(ctx: CmsContext) {
    // On new session initialization this value will be undefined
    return this.getSessionFromCtx(ctx).userId || null;
  }

  private setUserId(ctx: CmsContext, userId: User['id'] | null) {
    this.assignToSession(ctx, { userId });
  }

  private async validateNativeAuth<T extends NativeAuthInput>(
    promise: Promise<T | null>,
    password: string,
  ): Promise<T | null> {
    const entity = await promise;

    if (!entity) {
      return null;
    }

    const passwordIsValid = await AuthService.validatePassword(
      password,
      entity.password,
    );

    if (!passwordIsValid) {
      return null;
    }

    return entity;
  }

  validateUser({ email, password }: NativeAuthInput) {
    return this.validateNativeAuth(
      this.userService.findOne({ email }),
      password,
    );
  }

  async getCurrentUser(ctx: CmsContext): Promise<User | null> {
    const userId = this.getUserId(ctx);

    if (userId) return this.userService.findOne(userId);

    return null;
  }

  loginUser(ctx: CmsContext, user: User) {
    this.setUserId(ctx, user.id);
  }

  logoutUser(ctx: CmsContext) {
    this.setUserId(ctx, null);
  }
}
