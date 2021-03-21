import { Entity, Enum, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';

import { BaseEntity } from '../shared/base.entity';
import { Permission } from '../../common/permission.enum';

@Entity({ tableName: 'roles' })
@ObjectType('Role')
export class RoleEntity extends BaseEntity {
  @Field()
  @Property()
  name: string;

  @Property({ default: false })
  isAdmin: boolean;

  @Field(() => [Permission])
  @Enum({ items: () => Permission, array: true, default: [] })
  permissions: Permission[];
}
