import { createUnionType, ObjectType } from '@nestjs/graphql';

import { InputValidationError } from '../../common/errors/input-validation.error';
import { ResultError } from '../../common/errors/result.error';
import { generateListResponse } from '../shared/list-utils';
import { Product } from './product.entity';

export const ProductResponse = createUnionType({
  name: 'ProductResponse',
  types: () => [Product, ResultError],
});

export const UpdateProductResponse = createUnionType({
  name: 'UpdateProductResponse',
  types: () => [Product, InputValidationError, ResultError],
});

export const CreateProductResponse = createUnionType({
  name: 'CreateProductResponse',
  types: () => [Product, InputValidationError],
});

@ObjectType()
export class ProductListResponse extends generateListResponse(Product) {}
