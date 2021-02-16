import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getMetadataArgsStorage } from "typeorm";

import * as Services from "./services";

const entities = getMetadataArgsStorage().tables.map(
  ({ target }) => target as Function
);

const services = Object.values(Services);

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [...services],
  exports: [...services],
})
export class ServiceModule {}
