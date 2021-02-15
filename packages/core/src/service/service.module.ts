import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getMetadataArgsStorage } from "typeorm";

import {
  RoleService,
  UserService,
  AuthService,
  SessionService,
} from "./services";

const entities = getMetadataArgsStorage().tables.map(
  ({ target }) => target as Function
);

const services = [UserService, AuthService, SessionService, RoleService];

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [...services],
  exports: [...services],
})
export class ServiceModule {}
