import { createUnionType, Field, ObjectType } from '@nestjs/graphql';

import { InputValidationError } from '../../common/errors/input-validation.error';
import { ResultError } from '../../common/errors/result.error';
import { generateListResponse } from '../shared/list-utils';
import { Category } from './category.entity';

export const CategoryResponse = createUnionType({
  name: 'CategoryResponse',
  types: () => [Category, ResultError],
});

export const UpdateCategoryResponse = createUnionType({
  name: 'UpdateCategoryResponse',
  types: () => [Category, InputValidationError, ResultError],
});

export const CreateCategoryResponse = createUnionType({
  name: 'CreateCategoryResponse',
  types: () => [Category, InputValidationError],
});

@ObjectType()
export class CategoryListResponse extends generateListResponse(Category) {}

@ObjectType()
export class CategoryTreeResponse extends Category {
  @Field(() => [CategoryTreeResponse])
  children: CategoryTreeResponse[];
}
