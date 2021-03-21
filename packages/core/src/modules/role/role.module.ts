import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { Role } from './role.entity';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';

@Module({
  imports: [MikroOrmModule.forFeature([Role])],
  providers: [RoleService, RoleResolver],
  exports: [RoleService],
})
export class RoleModule {}
