import { Field, InputType } from '@nestjs/graphql';
import { BaseEntity } from '../base.entity';
import { SortOptions, SortOrder } from '../list-utils';

@InputType({ isAbstract: true })
export abstract class BaseSortOptions implements SortOptions<BaseEntity> {
  @Field(() => SortOrder, { nullable: true })
  id: SortOrder;

  @Field(() => SortOrder, { nullable: true })
  updatedAt: SortOrder;

  @Field(() => SortOrder, { nullable: true })
  createdAt: SortOrder;
}
