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
  CategoryTreeResponse,
} from "./responses";
import { CATEGORIES_TREE_DEPTH } from "../../common/constants";
import { EntityData } from "@mikro-orm/core";
import { CategoryEntity } from "./category.entity";

const categoriesPopulate =
  "children" + ".children".repeat(CATEGORIES_TREE_DEPTH - 1);

@Resolver()
@Injectable()
@InputValidation()
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => [CategoryTreeResponse])
  // NOTE: Needs to be cached and some point
  async categoriesTree() {
    return this.categoryService.find(
      { parent: null },
      { populate: [categoriesPopulate] }
    );
  }

  @Allow(Permission.ReadCategory)
  @Query(() => CategoryResponse)
  category(
    @Args("id", { type: () => Int }) id: number
  ): Promise<typeof CategoryResponse> {
    return this.categoryService.findOneOrFail({ id });
  }

  @Allow(Permission.ReadCategory)
  @Query(() => CategoryListResponse)
  categories(
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

    return this.categoryService.insert({
      ...category,
      parent: parentId,
    });
  }

  @Allow(Permission.UpdateCategory)
  @Mutation(() => UpdateCategoryResponse)
  updateCategory(
    @Args("id", { type: () => Int }) id: number,
    @Args("input") input: UpdateCategoryInput
  ): Promise<typeof UpdateCategoryResponse> {
    const { parentId, ...restInput } = input;

    const payload: EntityData<CategoryEntity> = restInput;

    if (parentId !== undefined) {
      payload.parent = parentId;
    }

    return this.categoryService.updateOne(id, payload);
  }
}
