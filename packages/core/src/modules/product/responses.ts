import { createUnionType, ObjectType } from '@nestjs/graphql';

import { InputValidationError } from '../../common/errors/input-validation.error';
import { ErrorResult } from '../../common/errors/error-result.error';
import { generateListResponse } from '../shared/list-utils';
import { ProductTranslation } from './product-translation.entity';
import { Product } from './product.entity';

export const ProductResponse = createUnionType({
  name: 'ProductResponse',
  types: () => [Product, ErrorResult],
});

export const UpdateProductResponse = createUnionType({
  name: 'UpdateProductResponse',
  types: () => [Product, InputValidationError, ErrorResult],
});

export const CreateProductResponse = createUnionType({
  name: 'CreateProductResponse',
  types: () => [Product, InputValidationError],
});

export const AddProductTranslationResponse = createUnionType({
  name: 'AddProductTranslationResponse',
  types: () => [ProductTranslation, InputValidationError, ErrorResult],
});

@ObjectType()
export class ProductListResponse extends generateListResponse(Product) {}
