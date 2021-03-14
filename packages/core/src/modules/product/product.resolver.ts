import { Injectable } from "@nestjs/common";
import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { Permission } from "../../common/permission.enum";

import { Allow, InputValidation } from "../../decorators";
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

  @Allow(Permission.CreateProduct)
  @Mutation(() => CreateProductResponse)
  createProduct(
    @Args("input") input: NewProductInput
  ): Promise<typeof CreateProductResponse> {
    return this.productService.insert(input);
  }

  @Allow(Permission.UpdateProduct)
  @Mutation(() => UpdateProductResponse)
  updateProduct(
    @Args("id", { type: () => Int }) id: number,
    @Args("input") input: UpdateProductInput
  ): Promise<typeof UpdateProductResponse> {
    return this.productService.updateOne(id, input);
  }
}
