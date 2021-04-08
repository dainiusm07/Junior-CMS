import { createUnionType, ObjectType } from '@nestjs/graphql';

import { InputValidationError } from '../../common/errors/input-validation.error';
import { ErrorResult } from '../../common/errors/error-result.error';
import { generateListResponse } from '../shared/list-utils';
import { Attribute } from './attribute.entity';
import { AttributeTranslation } from './attribute-translation.entity';

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

export const AddAttributeTranslationResponse = createUnionType({
  name: 'AddAttributeTranslationResponse',
  types: () => [AttributeTranslation, InputValidationError, ErrorResult],
});

@ObjectType()
export class AttributeListResponse extends generateListResponse(Attribute) {}
