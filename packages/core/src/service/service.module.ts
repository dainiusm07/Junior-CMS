import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserService } from "./services/user.service";
import { getMetadataArgsStorage } from "typeorm";

const entities = getMetadataArgsStorage().tables.map(
  ({ target }) => target as Function
);

const services = [UserService];

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [...services],
  exports: [...services],
})
export class ServiceModule {}
