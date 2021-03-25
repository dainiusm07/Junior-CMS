import { Type } from '@nestjs/common';
import { createUnionType, ObjectType } from '@nestjs/graphql';

import { InputValidationError } from '../../common/errors/input-validation.error';
import { ResultError } from '../../common/errors/result.error';
import { Translated } from '../../types/Translations';
import { generateListResponse } from '../shared/list-utils';
import { ProductTranslation } from './product-translation.entity';
import { Product } from './product.entity';

const TranslatedProduct = Product as Type<Translated<Product>>;

export const ProductResponse = createUnionType({
  name: 'ProductResponse',
  types: () => [TranslatedProduct, ResultError],
});

export const UpdateProductResponse = createUnionType({
  name: 'UpdateProductResponse',
  types: () => [TranslatedProduct, InputValidationError, ResultError],
});

export const CreateProductResponse = createUnionType({
  name: 'CreateProductResponse',
  types: () => [TranslatedProduct, InputValidationError],
});

export const AddProductTranslationResponse = createUnionType({
  name: 'AddProductTranslationResponse',
  types: () => [ProductTranslation, InputValidationError, ResultError],
});

@ObjectType()
export class ProductListResponse extends generateListResponse(
  TranslatedProduct,
) {}
