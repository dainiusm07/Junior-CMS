import { InputType, PartialType } from "@nestjs/graphql";

import { NewAttributeValueInput } from "./new-attribute-value.input";

@InputType()
export class UpdateAttributeValueInput extends PartialType(
  NewAttributeValueInput
) {}
