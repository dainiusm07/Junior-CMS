import { compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { NativeAuthInput } from './dto/native-auth.input';

type SessionData = {
  userId: User['id'] | null;
};

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  private getSessionFromCtx(ctx: any) {
    return ctx.req.session as SessionData;
  }

  private assignToSession(ctx: any, data: unknown) {
    const session = this.getSessionFromCtx(ctx);
    Object.assign(session, data);
  }

  private getUserId(ctx: any) {
    // On new session initialization this value will be undefined
    return this.getSessionFromCtx(ctx).userId || null;
  }

  private setUserId(ctx: any, userId: User['id'] | null) {
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

    const passwordIsValid = await compare(password, entity.password);

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

  async getCurrentUser(ctx: any): Promise<User | null> {
    const userId = this.getUserId(ctx);

    if (userId) return this.userService.findOne(userId);

    return null;
  }

  loginUser(ctx: any, user: User) {
    this.setUserId(ctx, user.id);
  }

  logoutUser(ctx: any) {
    this.setUserId(ctx, null);
  }
}
