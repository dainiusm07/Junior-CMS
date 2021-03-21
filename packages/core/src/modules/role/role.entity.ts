import { Entity, Enum, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';

import { BaseEntity } from '../shared/base.entity';
import { Permission } from '../../common/permission.enum';

@ObjectType()
@Entity({ tableName: 'roles' })
export class Role extends BaseEntity {
  @Field()
  @Property()
  name: string;

  @Property({ default: false })
  isAdmin: boolean;

  @Field(() => [Permission])
  @Enum({ items: () => Permission, array: true, default: [] })
  permissions: Permission[];
}
