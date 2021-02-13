import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserService } from "./services/user.service";
import { getMetadataArgsStorage } from "typeorm";
import { SessionService } from "./services/session.service";
import { AuthService } from "./services/auth.service";

const entities = getMetadataArgsStorage().tables.map(
  ({ target }) => target as Function
);

const services = [UserService, SessionService, AuthService];

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [...services],
  exports: [...services],
})
export class ServiceModule {}
