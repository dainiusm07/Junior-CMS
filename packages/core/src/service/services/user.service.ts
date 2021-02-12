import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { UserEntity } from "src/entities/user/user.entity";
import createBaseService from "../helpers/create-base-service";

Injectable();
export class UserService extends createBaseService(UserEntity) {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>
  ) {
    super(userRepo);
  }

  findMany() {
    return this.userRepo.find();
  }
}
