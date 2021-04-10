import { createUnionType, ObjectType } from '@nestjs/graphql';

import { InputValidationError } from '../../common/errors/input-validation.error';
import { ErrorResult } from '../../common/errors/error-result.error';
import { generateListResponse } from '../shared/list-utils';
import { Category } from './category.entity';
import { CategoryTranslation } from './category-translation.entity';

export const CategoryResponse = createUnionType({
  name: 'CategoryResponse',
  types: () => [Category, ErrorResult],
});

export const UpdateCategoryResponse = createUnionType({
  name: 'UpdateCategoryResponse',
  types: () => [Category, InputValidationError, ErrorResult],
});

export const CreateCategoryResponse = createUnionType({
  name: 'CreateCategoryResponse',
  types: () => [Category, InputValidationError],
});

export const AddCategoryTranslationResponse = createUnionType({
  name: 'AddCategoryTranslationResponse',
  types: () => [CategoryTranslation, InputValidationError, ErrorResult],
});

@ObjectType()
export class CategoryListResponse extends generateListResponse(Category) {}
