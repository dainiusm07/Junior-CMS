import { Inject, Injectable } from "@nestjs/common";
import { CONTEXT } from "@nestjs/graphql";
import { ExpressContext } from "apollo-server-express";

import { UserEntity } from "../../entities/user/user.entity";

type Maybe<T> = T | null;
type UserId = UserEntity["id"];

type SessionData = {
  userId: Maybe<UserId>;
};
@Injectable()
export class SessionService {
  private req: ExpressContext["req"] & { session: SessionData };
  constructor(@Inject(CONTEXT) context: ExpressContext) {
    this.req = context.req as ExpressContext["req"] & { session: SessionData };
  }

  private assignToSession(obj: unknown) {
    Object.assign(this.req.session, obj);
  }

  getUserId() {
    // On new session initialization this value will be undefined
    return this.req.session.userId || null;
  }

  setUserId(userId: Maybe<UserId>) {
    this.assignToSession({ userId });
  }
}
