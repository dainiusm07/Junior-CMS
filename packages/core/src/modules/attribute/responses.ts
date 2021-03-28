import { createUnionType, ObjectType } from '@nestjs/graphql';

import { InputValidationError } from '../../common/errors/input-validation.error';
import { ErrorResult } from '../../common/errors/error-result.error';
import { generateListResponse } from '../shared/list-utils';
import { Attribute } from './attribute.entity';

export const AttributeResponse = createUnionType({
  name: 'AttributeResponse',
  types: () => [Attribute, ErrorResult],
});

export const UpdateAttributeResponse = createUnionType({
  name: 'UpdateAttributeResponse',
  types: () => [Attribute, InputValidationError, ErrorResult],
});

export const CreateAttributeResponse = createUnionType({
  name: 'CreateAttributeResponse',
  types: () => [Attribute, InputValidationError],
});

@ObjectType()
export class AttributeListResponse extends generateListResponse(Attribute) {}
