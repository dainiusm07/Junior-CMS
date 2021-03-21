import { createUnionType } from '@nestjs/graphql';

import { InputValidationError } from '../../common/errors/input-validation.error';
import { NotFoundError } from '../../common/errors/not-found.error';
import { AttributeValue } from './attribute-value.entity';

export const UpdateAttributeValueResponse = createUnionType({
  name: 'UpdateAttributeValueResponse',
  types: () => [AttributeValue, InputValidationError, NotFoundError],
});

export const CreateAttributeValueResponse = createUnionType({
  name: 'CreateAttributeValueResponse',
  types: () => [AttributeValue, InputValidationError],
});
