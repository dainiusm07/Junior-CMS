import { Injectable } from "@nestjs/common";
import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { Permission } from "../../common/permission.enum";

import { Allow, InputValidation } from "../../decorators";
import {
  NewCategoryInput,
  CategoryListOptions,
  UpdateCategoryInput,
} from "./dto";
import { CategoryService } from "./category.service";
import {
  CreateCategoryResponse,
  CategoryListResponse,
  CategoryResponse,
  UpdateCategoryResponse,
} from "./responses";

@Resolver()
@Injectable()
@InputValidation()
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Allow(Permission.ReadCategory)
  @Query(() => CategoryResponse)
  product(
    @Args("id", { type: () => Int }) id: number
  ): Promise<typeof CategoryResponse> {
    return this.categoryService.findOneOrFail({ id });
  }

  @Allow(Permission.ReadCategory)
  @Query(() => CategoryListResponse)
  products(
    @Args() options: CategoryListOptions
  ): Promise<CategoryListResponse> {
    return this.categoryService.findList(options);
  }

  @Allow(Permission.UpdateCategory)
  @Mutation(() => Boolean)
  isCategorySlugAvailable(@Args("slug") slug: string): Promise<Boolean> {
    return this.categoryService.checkSlugAvailability(slug);
  }

  @Allow(Permission.UpdateCategory)
  @Mutation(() => String)
  getCategorySlug(@Args("name") name: string): Promise<String> {
    return this.categoryService.getAvailableSlug(name);
  }

  @Allow(Permission.CreateCategory)
  @Mutation(() => CreateCategoryResponse)
  async createCategory(
    @Args("input") input: NewCategoryInput
  ): Promise<typeof CreateCategoryResponse> {
    const { parentId, ...category } = input;

    if (!category.slug) {
      category.slug = await this.categoryService.getAvailableSlug(
        category.name
      );
    }

    const parentCategory = this.categoryService.getReference(parentId);

    return this.categoryService.insert({
      ...category,
      parent: parentCategory,
    });
  }

  @Allow(Permission.UpdateCategory)
  @Mutation(() => UpdateCategoryResponse)
  updateCategory(
    @Args("id", { type: () => Int }) id: number,
    @Args("input") input: UpdateCategoryInput
  ): Promise<typeof UpdateCategoryResponse> {
    return this.categoryService.updateOne(id, input);
  }
}
