import { Injectable } from '@nestjs/common';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';

import { Permission } from '../../common/permission.enum';
import { Allow } from '../../decorators';
import { InputValidationPipe } from '../../middleware/input-validation.pipe';
import { NewProductVariantInput, UpdateProductVariantInput } from './dto';
import { ProductVariantService } from './product-variant.service';
import {
  CreateProductVariantResponse,
  UpdateProductVariantResponse,
} from './responses';

@Resolver()
@Injectable()
export class ProductVariantResolver {
  constructor(private productVariantService: ProductVariantService) {}

  @Allow(Permission.UpdateProduct)
  @Mutation(() => Boolean)
  isProductVariantSlugAvailable(@Args('slug') slug: string): Promise<boolean> {
    return this.productVariantService.checkSlugAvailability(slug);
  }

  @Allow(Permission.UpdateProduct)
  @Mutation(() => String)
  getProductVariantSlug(@Args('name') name: string): Promise<string> {
    return this.productVariantService.getAvailableSlug(name);
  }

  @Allow(Permission.UpdateProduct, Permission.CreateProduct)
  @Mutation(() => CreateProductVariantResponse)
  async createProductVariant(
    @Args('input', InputValidationPipe) input: NewProductVariantInput,
  ): Promise<typeof CreateProductVariantResponse> {
    const { attributesValuesIds, productId, ...restInput } = input;

    return this.productVariantService.insert({
      ...restInput,
      attributesValues: attributesValuesIds,
      product: productId,
    });
  }

  @Allow(Permission.UpdateProduct)
  @Mutation(() => UpdateProductVariantResponse)
  updateProductVariant(
    @Args('id', { type: () => Int }) id: number,
    @Args('input', InputValidationPipe) input: UpdateProductVariantInput,
  ): Promise<typeof UpdateProductVariantResponse> {
    const { attributesValuesIds, productId, ...restInput } = input;

    return this.productVariantService.updateOne(id, {
      ...restInput,
      attributesValues: attributesValuesIds,
      product: productId,
    });
  }
}
