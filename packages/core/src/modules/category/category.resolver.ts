import { Injectable } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { Permission } from '../../common/permission.enum';
import { Allow } from '../../decorators';
import {
  NewCategoryInput,
  CategoryListOptions,
  UpdateCategoryInput,
} from './dto';
import { CategoryService } from './category.service';
import {
  CreateCategoryResponse,
  CategoryListResponse,
  CategoryResponse,
  UpdateCategoryResponse,
  CategoryTreeResponse,
} from './responses';
import { InputValidationPipe } from '../../middleware/input-validation.pipe';

@Resolver()
@Injectable()
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => [CategoryTreeResponse])
  // NOTE: Needs to be cached and some point
  async categoriesTree(
    @Args('id', { type: () => Int, nullable: true }) id?: number,
  ): Promise<CategoryTreeResponse[]> {
    return this.categoryService.getCategoriesTree(id);
  }

  @Allow(Permission.ReadCategory)
  @Query(() => CategoryResponse)
  category(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<typeof CategoryResponse> {
    return this.categoryService.findOneOrFail({ id });
  }

  @Allow(Permission.ReadCategory)
  @Query(() => CategoryListResponse)
  categories(
    @Args() options: CategoryListOptions,
  ): Promise<CategoryListResponse> {
    return this.categoryService.findList(options);
  }

  @Allow(Permission.UpdateCategory)
  @Mutation(() => Boolean)
  isCategorySlugAvailable(@Args('slug') slug: string): Promise<boolean> {
    return this.categoryService.checkSlugAvailability(slug);
  }

  @Allow(Permission.UpdateCategory)
  @Mutation(() => String)
  getCategorySlug(@Args('name') name: string): Promise<string> {
    return this.categoryService.getAvailableSlug(name);
  }

  @Allow(Permission.CreateCategory)
  @Mutation(() => CreateCategoryResponse)
  async createCategory(
    @Args('input', InputValidationPipe) input: NewCategoryInput,
  ): Promise<typeof CreateCategoryResponse> {
    const { parentId, ...category } = input;

    return this.categoryService.insert({
      ...category,
      parent: parentId,
    });
  }

  @Allow(Permission.UpdateCategory)
  @Mutation(() => UpdateCategoryResponse)
  updateCategory(
    @Args('id', { type: () => Int }) id: number,
    @Args('input', InputValidationPipe) input: UpdateCategoryInput,
  ): Promise<typeof UpdateCategoryResponse> {
    const { parentId, ...restInput } = input;

    return this.categoryService.updateOne(id, {
      ...restInput,
      parent: parentId,
    });
  }
}
