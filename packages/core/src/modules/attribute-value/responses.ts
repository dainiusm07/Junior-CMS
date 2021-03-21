import { createUnionType } from '@nestjs/graphql';

import { InputValidationError } from '../../common/errors/input-validation.error';
import { ResultError } from '../../common/errors/result.error';
import { AttributeValue } from './attribute-value.entity';

export const UpdateAttributeValueResponse = createUnionType({
  name: 'UpdateAttributeValueResponse',
  types: () => [AttributeValue, InputValidationError, ResultError],
});

export const CreateAttributeValueResponse = createUnionType({
  name: 'CreateAttributeValueResponse',
  types: () => [AttributeValue, InputValidationError],
});
