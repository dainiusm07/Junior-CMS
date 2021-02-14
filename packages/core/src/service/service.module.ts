import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserService } from "./services/user.service";
import { getMetadataArgsStorage } from "typeorm";
import { AuthService } from "./services/auth.service";
import { SessionService } from "./services/session.service";

const entities = getMetadataArgsStorage().tables.map(
  ({ target }) => target as Function
);

const services = [UserService, AuthService, SessionService];

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [...services],
  exports: [...services],
})
export class ServiceModule {}
