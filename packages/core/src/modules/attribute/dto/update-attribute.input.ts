import { InputType, PartialType } from '@nestjs/graphql';

import { NewAttributeInput } from './new-attribute.input';

@InputType()
export class UpdateAttributeInput extends PartialType(NewAttributeInput) {}
