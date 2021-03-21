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

@ObjectType()
@Entity({ tableName: 'categories' })
export class Category extends BaseEntity {
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

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, {
    cascade: [Cascade.ALL],
    nullable: true,
    unique: false,
  })
  parent: Category;

  @OneToMany(() => Category, 'parent', {
    strategy: LoadStrategy.SELECT_IN,
  })
  children: Category[];
}
