import {
  Cascade,
  Entity,
  LoadStrategy,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';

import { BaseEntity } from '../shared/base.entity';

@ObjectType('Category')
@Entity({ tableName: 'categories' })
export class CategoryEntity extends BaseEntity {
  @Field(() => Date, { nullable: true })
  @Property({ type: Date, nullable: true })
  deletedAt: Date | null;

  @Field()
  @Property()
  name: string;

  @Field()
  @Property({ index: true, unique: true })
  slug: string;

  @Field()
  @Property({ default: true })
  active: boolean;

  @Field(() => CategoryEntity, { nullable: true })
  @ManyToOne(() => CategoryEntity, {
    cascade: [Cascade.ALL],
    nullable: true,
    unique: false,
  })
  parent: CategoryEntity;

  @OneToMany(() => CategoryEntity, 'parent', {
    strategy: LoadStrategy.SELECT_IN,
  })
  children: CategoryEntity[];
}
