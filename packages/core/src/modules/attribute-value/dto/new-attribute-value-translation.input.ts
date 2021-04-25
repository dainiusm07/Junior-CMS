import { Field, InputType, Int } from '@nestjs/graphql';

import { Exists } from '../../shared/constraints';
import { AttributeValue } from '../attribute-value.entity';

@InputType()
export class NewAttributeValueTranslationInput {
  @Exists(AttributeValue, 'id')
  @Field(() => Int)
  attributeValueId: number;

  @Field()
  value: string;
}
