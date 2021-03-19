import { LoadStrategy } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";

import { Permission } from "../../common/permission.enum";
import { Allow } from "../../decorators";
import { InputValidationPipe } from "../../middleware/input-validation.pipe";
import { NewProductInput, ProductListOptions, UpdateProductInput } from "./dto";
import { ProductService } from "./product.service";
import {
  CreateProductResponse,
  ProductListResponse,
  ProductResponse,
  UpdateProductResponse,
} from "./responses";

@Resolver()
@Injectable()
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Allow(Permission.ReadProduct)
  @Query(() => ProductResponse)
  async product(
    @Args("id", { type: () => Int }) id: number
  ): Promise<typeof ProductResponse> {
    return this.productService.findOneOrFail(
      { id },
      {
        populate: { attributesValues: { attribute: true } },
        strategy: LoadStrategy.JOINED,
      }
    );
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
    @Args("input", InputValidationPipe) input: NewProductInput
  ): Promise<typeof CreateProductResponse> {
    const { categoryId, attributesValuesIds, ...restInput } = input;

    return this.productService.insert({
      ...restInput,
      category: categoryId,
      attributesValues: attributesValuesIds,
    });
  }

  @Allow(Permission.UpdateProduct)
  @Mutation(() => UpdateProductResponse)
  updateProduct(
    @Args("id", { type: () => Int }) id: number,
    @Args("input", InputValidationPipe) input: UpdateProductInput
  ): Promise<typeof UpdateProductResponse> {
    const { categoryId, attributesValuesIds, ...restInput } = input;

    return this.productService.updateOne(id, {
      ...restInput,
      attributesValues: attributesValuesIds,
      category: categoryId,
    });
  }
}
