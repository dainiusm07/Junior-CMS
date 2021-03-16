import { EntityData } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { Permission } from "../../common/permission.enum";

import { Allow, InputValidation } from "../../decorators";
import { NewProductInput, ProductListOptions, UpdateProductInput } from "./dto";
import { ProductEntity } from "./product.entity";
import { ProductService } from "./product.service";
import {
  CreateProductResponse,
  ProductListResponse,
  ProductResponse,
  UpdateProductResponse,
} from "./responses";

@Resolver()
@Injectable()
@InputValidation()
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Allow(Permission.ReadProduct)
  @Query(() => ProductResponse)
  product(
    @Args("id", { type: () => Int }) id: number
  ): Promise<typeof ProductResponse> {
    return this.productService.findOneOrFail({ id });
  }

  @Allow(Permission.ReadProduct)
  @Query(() => ProductListResponse)
  products(@Args() options: ProductListOptions): Promise<ProductListResponse> {
    return this.productService.findList(options);
  }

  @Allow(Permission.UpdateProduct)
  @Mutation(() => Boolean)
  isProductSlugAvailable(@Args("slug") slug: string): Promise<Boolean> {
    return this.productService.checkSlugAvailability(slug);
  }

  @Allow(Permission.UpdateProduct)
  @Mutation(() => String)
  getProductSlug(@Args("name") name: string): Promise<String> {
    return this.productService.getAvailableSlug(name);
  }

  @Allow(Permission.CreateProduct)
  @Mutation(() => CreateProductResponse)
  async createProduct(
    @Args("input") input: NewProductInput
  ): Promise<typeof CreateProductResponse> {
    const { categoryId, ...restInput } = input;

    if (!restInput.slug) {
      restInput.slug = await this.productService.getAvailableSlug(
        restInput.name
      );
    }

    return this.productService.insert({
      ...restInput,
      category: categoryId,
    });
  }

  @Allow(Permission.UpdateProduct)
  @Mutation(() => UpdateProductResponse)
  updateProduct(
    @Args("id", { type: () => Int }) id: number,
    @Args("input") input: UpdateProductInput
  ): Promise<typeof UpdateProductResponse> {
    const { categoryId, ...restInput } = input;
    const payload: EntityData<ProductEntity> = restInput;

    if (categoryId) {
      payload.category = categoryId;
    }
    return this.productService.updateOne(id, payload);
  }
}
