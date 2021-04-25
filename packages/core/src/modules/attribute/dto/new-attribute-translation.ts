import { Field, InputType, Int } from '@nestjs/graphql';

import { Exists } from '../../shared/constraints';
import { Attribute } from '../attribute.entity';

@InputType()
export class NewAttributeTranslationInput {
  @Field()
  name: string;

  @Exists(Attribute, 'id')
  @Field(() => Int)
  attributeId: number;
}
