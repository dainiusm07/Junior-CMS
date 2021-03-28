import { createUnionType } from '@nestjs/graphql';

import { InputValidationError } from '../../common/errors/input-validation.error';
import { ErrorResult } from '../../common/errors/error-result.error';
import { AttributeValue } from './attribute-value.entity';

export const UpdateAttributeValueResponse = createUnionType({
  name: 'UpdateAttributeValueResponse',
  types: () => [AttributeValue, InputValidationError, ErrorResult],
});

export const CreateAttributeValueResponse = createUnionType({
  name: 'CreateAttributeValueResponse',
  types: () => [AttributeValue, InputValidationError],
});
