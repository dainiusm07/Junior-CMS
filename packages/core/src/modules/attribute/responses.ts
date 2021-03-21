import { createUnionType } from '@nestjs/graphql';

import { InputValidationError } from '../../common/errors/input-validation.error';
import { NotFoundError } from '../../common/errors/not-found.error';
import { Attribute } from './attribute.entity';

export const AttributeResponse = createUnionType({
  name: 'AttributeResponse',
  types: () => [Attribute, NotFoundError],
});

export const UpdateAttributeResponse = createUnionType({
  name: 'UpdateAttributeResponse',
  types: () => [Attribute, InputValidationError, NotFoundError],
});

export const CreateAttributeResponse = createUnionType({
  name: 'CreateAttributeResponse',
  types: () => [Attribute, InputValidationError],
});
