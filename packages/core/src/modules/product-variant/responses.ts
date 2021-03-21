import { createUnionType } from '@nestjs/graphql';

import { InputValidationError } from '../../common/errors/input-validation.error';
import { NotFoundError } from '../../common/errors/not-found.error';
import { ProductVariant } from './product-variant.entity';

export const UpdateProductVariantResponse = createUnionType({
  name: 'UpdateProductVariantResponse',
  types: () => [ProductVariant, InputValidationError, NotFoundError],
});

export const CreateProductVariantResponse = createUnionType({
  name: 'CreateProductVariantResponse',
  types: () => [ProductVariant, InputValidationError],
});
