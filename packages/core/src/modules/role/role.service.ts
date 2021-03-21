import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { BaseService } from '../shared/base.service';
import { RoleEntity } from './role.entity';

@Injectable()
export class RoleService extends BaseService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepo: EntityRepository<RoleEntity>,
  ) {
    super(roleRepo, 'Role');
  }
}
