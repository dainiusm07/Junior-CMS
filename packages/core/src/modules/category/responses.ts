import { createUnionType, Field, ObjectType } from '@nestjs/graphql';

import { InputValidationError } from '../../common/errors/input-validation.error';
import { NotFoundError } from '../../common/errors/not-found.error';
import { generateListResponse } from '../shared/list-utils';
import { CategoryEntity } from './category.entity';

export const CategoryResponse = createUnionType({
  name: 'CategoryResponse',
  types: () => [CategoryEntity, NotFoundError],
});

export const UpdateCategoryResponse = createUnionType({
  name: 'UpdateCategoryResponse',
  types: () => [CategoryEntity, InputValidationError, NotFoundError],
});

export const CreateCategoryResponse = createUnionType({
  name: 'CreateCategoryResponse',
  types: () => [CategoryEntity, InputValidationError],
});

@ObjectType()
export class CategoryListResponse extends generateListResponse(
  CategoryEntity,
) {}

@ObjectType()
export class CategoryTreeResponse extends CategoryEntity {
  @Field(() => [CategoryTreeResponse])
  children: CategoryTreeResponse[];
}
