import { Field, InputType, Int } from '@nestjs/graphql';

import { Attribute } from '../../attribute/attribute.entity';
import { Exists } from '../../shared/constraints';

@InputType()
export class NewAttributeValueInput {
  @Exists(Attribute, 'id')
  @Field(() => Int)
  attributeId: number;

  @Field()
  value: string;
}
