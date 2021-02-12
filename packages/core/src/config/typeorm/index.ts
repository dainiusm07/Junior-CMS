import { Injectable } from "@nestjs/common";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConnectionOptions, getMetadataArgsStorage } from "typeorm";

import { TYPEORM } from "@environments";

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const options: ConnectionOptions = {
      type: "postgres",
      ...TYPEORM,
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
    };
    return options;
  }
}
