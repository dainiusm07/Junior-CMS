import { createUnionType, ObjectType } from '@nestjs/graphql';

import { InputValidationError } from '../../common/errors/input-validation.error';
import { ResultError } from '../../common/errors/result.error';
import { generateListResponse } from '../shared/list-utils';
import { Attribute } from './attribute.entity';

export const AttributeResponse = createUnionType({
  name: 'AttributeResponse',
  types: () => [Attribute, ResultError],
});

export const UpdateAttributeResponse = createUnionType({
  name: 'UpdateAttributeResponse',
  types: () => [Attribute, InputValidationError, ResultError],
});

export const CreateAttributeResponse = createUnionType({
  name: 'CreateAttributeResponse',
  types: () => [Attribute, InputValidationError],
});

@ObjectType()
export class AttributeListResponse extends generateListResponse(Attribute) {}
