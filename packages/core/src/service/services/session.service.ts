import { Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { UserEntity } from "src/entities/user/user.entity";

type UserId = UserEntity["id"];

@Injectable()
export class SessionService {
  constructor(@Inject(REQUEST) private request) {}

  private assignToSession(obj: unknown) {
    Object.assign(this.request.req.session, obj);
  }

  getUserId(): UserId | undefined {
    return this.request.req.session.userId;
  }

  setUserId(userId: UserId) {
    this.assignToSession({ userId });
  }
}
