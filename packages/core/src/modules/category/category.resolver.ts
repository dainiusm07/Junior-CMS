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
  AddCategoryTranslationResponse,
} from './responses';
import { InputValidationPipe } from '../../middleware';
import { Category } from './category.entity';
import { Translated } from '../../types/Translations';
import { IListResponse } from '../shared/list-utils';
import { Ctx } from '../../decorators/ctx.decorator';
import { CmsContext } from '../../types/CmsContext';
import { NewCategoryTranslationInput } from './dto/new-category-translation.input';
import { CategoryTranslation } from './category-translation.entity';

type TranslatedCategory = Translated<Category>;

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
    @Ctx() ctx: CmsContext,
  ): Promise<Category> {
    return this.categoryService.findOneOrFail({ id }, undefined, ctx);
  }

  @Allow(Permission.ReadCategory)
  @Query(() => CategoryListResponse)
  categories(
    @Args() options: CategoryListOptions,
    @Ctx() ctx: CmsContext,
  ): Promise<IListResponse<TranslatedCategory>> {
    return this.categoryService.findList(options, ctx);
  }

  @Allow(Permission.UpdateCategory)
  @Query(() => Boolean)
  isCategorySlugAvailable(@Args('slug') slug: string): Promise<boolean> {
    return this.categoryService.checkSlugAvailability(slug);
  }

  @Allow(Permission.UpdateCategory)
  @Query(() => String)
  getCategorySlug(@Args('name') name: string): Promise<string> {
    return this.categoryService.getAvailableSlug(name);
  }

  @Allow(Permission.CreateCategory)
  @Mutation(() => CreateCategoryResponse)
  async createCategory(
    @Args('input', InputValidationPipe) input: NewCategoryInput,
    @Ctx() { languageCode }: CmsContext,
  ): Promise<TranslatedCategory> {
    const { parentId, ...category } = input;

    return this.categoryService.insert({
      ...category,
      languageCode,
      parent: parentId,
    });
  }

  @Allow(Permission.UpdateCategory)
  @Mutation(() => UpdateCategoryResponse)
  updateCategory(
    @Args('id', { type: () => Int }) id: number,
    @Args('input', InputValidationPipe) input: UpdateCategoryInput,
    @Ctx() { languageCode }: CmsContext,
  ): Promise<TranslatedCategory> {
    const { parentId, ...restInput } = input;

    return this.categoryService.updateOne(
      { id, translations: { languageCode } },
      {
        ...restInput,
        parent: parentId,
      },
    );
  }

  @Allow(Permission.UpdateCategory)
  @Mutation(() => AddCategoryTranslationResponse)
  addCategoryTranslation(
    @Args('input', InputValidationPipe) input: NewCategoryTranslationInput,
    @Ctx() { languageCode }: CmsContext,
  ): Promise<CategoryTranslation> {
    const { categoryId, ...restInput } = input;

    return this.categoryService.addTranslation({
      ...restInput,
      languageCode,
      category: categoryId,
    });
  }
}
