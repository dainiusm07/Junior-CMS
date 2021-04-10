import { InputType, PartialType, OmitType } from '@nestjs/graphql';

import { NewAttributeValueInput } from './new-attribute-value.input';

@InputType()
export class UpdateAttributeValueInput extends OmitType(
  PartialType(NewAttributeValueInput),
  ['attributeId'],
) {}
