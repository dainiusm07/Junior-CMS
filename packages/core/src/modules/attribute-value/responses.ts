import { createUnionType } from '@nestjs/graphql';

import { InputValidationError } from '../../common/errors/input-validation.error';
import { NotFoundError } from '../../common/errors/not-found.error';
import { AttributeValueEntity } from './attribute-value.entity';

export const UpdateAttributeValueResponse = createUnionType({
  name: 'UpdateAttributeValueResponse',
  types: () => [AttributeValueEntity, InputValidationError, NotFoundError],
});

export const CreateAttributeValueResponse = createUnionType({
  name: 'CreateAttributeValueResponse',
  types: () => [AttributeValueEntity, InputValidationError],
});
