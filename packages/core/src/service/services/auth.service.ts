import { compare } from "bcrypt";
import { Injectable } from "@nestjs/common";
import { SessionService } from "./session.service";

import { UserEntity } from "../../entities/user/user.entity";
import { NativeAuthInput } from "@junior-cms/common";
import { UserService } from "./user.service";
import { BaseService } from "./base.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private sessionService: SessionService
  ) {}

  private async validateNativeAuth<T extends NativeAuthInput>(
    service: BaseService<T>,
    { email, password }: NativeAuthInput
  ): Promise<T | null> {
    const entity = await service.findOne({ where: { email } });

    if (!entity) {
      return null;
    }

    const passwordIsValid = await compare(password, entity.password);

    if (!passwordIsValid) {
      return null;
    }

    return entity;
  }

  validateUser(input: NativeAuthInput) {
    return this.validateNativeAuth(this.userService, input);
  }

  loginUser(user: UserEntity) {
    this.sessionService.setUserId(user.id);
  }

  logoutUser() {
    this.sessionService.setUserId(null);
  }
}
