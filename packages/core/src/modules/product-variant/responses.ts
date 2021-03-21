import { createUnionType } from '@nestjs/graphql';

import { InputValidationError } from '../../common/errors/input-validation.error';
import { ResultError } from '../../common/errors/result.error';
import { ProductVariant } from './product-variant.entity';

export const UpdateProductVariantResponse = createUnionType({
  name: 'UpdateProductVariantResponse',
  types: () => [ProductVariant, InputValidationError, ResultError],
});

export const CreateProductVariantResponse = createUnionType({
  name: 'CreateProductVariantResponse',
  types: () => [ProductVariant, InputValidationError],
});
