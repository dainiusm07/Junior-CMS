import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";

import { RoleEntity } from "./role.entity";
import { RoleResolver } from "./role.resolver";
import { RoleService } from "./role.service";

@Module({
  imports: [MikroOrmModule.forFeature([RoleEntity])],
  providers: [RoleService, RoleResolver],
  exports: [RoleService],
})
export class RoleModule {}
