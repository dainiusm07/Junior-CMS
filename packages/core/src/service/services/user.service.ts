import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NativeAuthInput } from "@junior-cms/common";

import createBaseService from "../helpers/create-base-service";
import { UserEntity } from "../../entities/user/user.entity";

Injectable();
export class UserService extends createBaseService(UserEntity) {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>
  ) {
    super(userRepo);
  }

  async login({ email, password }: NativeAuthInput) {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return null;
    }

    return user;
  }

  findMany() {
    return this.userRepo.find();
  }
}
