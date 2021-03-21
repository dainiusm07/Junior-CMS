import { createUnionType, ObjectType } from '@nestjs/graphql';

import { InputValidationError } from '../../common/errors/input-validation.error';
import { NotFoundError } from '../../common/errors/not-found.error';
import { generateListResponse } from '../shared/list-utils';
import { Product } from './product.entity';

export const ProductResponse = createUnionType({
  name: 'ProductResponse',
  types: () => [Product, NotFoundError],
});

export const UpdateProductResponse = createUnionType({
  name: 'UpdateProductResponse',
  types: () => [Product, InputValidationError, NotFoundError],
});

export const CreateProductResponse = createUnionType({
  name: 'CreateProductResponse',
  types: () => [Product, InputValidationError],
});

@ObjectType()
export class ProductListResponse extends generateListResponse(Product) {}
