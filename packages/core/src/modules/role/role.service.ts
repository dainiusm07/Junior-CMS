import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { BaseService } from '../shared/base.service';
import { Role } from './role.entity';

@Injectable()
export class RoleService extends BaseService<Role> {
  constructor(
    @InjectRepository(Role)
    private roleRepo: EntityRepository<Role>,
  ) {
    super(roleRepo, 'Role');
  }
}
