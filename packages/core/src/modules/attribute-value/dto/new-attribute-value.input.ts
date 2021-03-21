import { Field, InputType, Int } from '@nestjs/graphql';

import { AttributeEntity } from '../../attribute/attribute.entity';
import { Exists } from '../../shared/constraints/exists.constraint';

@InputType()
export class NewAttributeValueInput {
  @Exists(AttributeEntity, 'id', 'Attribute')
  @Field(() => Int)
  attributeId: number;
  @Field()
  value: string;
}
