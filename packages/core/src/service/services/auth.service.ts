import { compare } from "bcrypt";
import { Injectable } from "@nestjs/common";
import { SessionService } from "./session.service";
import { NativeAuthInput } from "@generator";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/user/user.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private sessionService: SessionService
  ) {}

  private async validateNativeAuth<T extends NativeAuthInput>(
    repo: Repository<T>,
    { email, password }: NativeAuthInput
  ): Promise<T | null> {
    const entity = await repo.findOne({ where: { email } });

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
    return this.validateNativeAuth(this.userRepo, input);
  }

  loginUser(user: UserEntity) {
    this.sessionService.setUserId(user.id);
  }
}
