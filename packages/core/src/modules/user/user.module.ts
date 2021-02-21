import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";

import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { RoleService } from "../role/role.service";
import { RoleEntity } from "../role/role.entity";

@Module({
  imports: [MikroOrmModule.forFeature([RoleEntity, UserEntity])],
  providers: [RoleService, UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
