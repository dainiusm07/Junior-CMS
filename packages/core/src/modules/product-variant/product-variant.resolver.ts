import { Injectable } from '@nestjs/common';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';

import { Permission } from '../../common/permission.enum';
import { Allow } from '../../decorators';
import { InputValidationPipe } from '../../middleware';
import { NewProductVariantInput, UpdateProductVariantInput } from './dto';
import { ProductVariant } from './product-variant.entity';
import { ProductVariantService } from './product-variant.service';
import {
  CreateProductVariantResponse,
  UpdateProductVariantResponse,
} from './responses';

@Resolver()
@Injectable()
export class ProductVariantResolver {
  constructor(private productVariantService: ProductVariantService) {}

  @Allow(Permission.UpdateProduct, Permission.CreateProduct)
  @Mutation(() => CreateProductVariantResponse)
  async createProductVariant(
    @Args('input', InputValidationPipe) input: NewProductVariantInput,
  ): Promise<ProductVariant> {
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
  ): Promise<ProductVariant> {
    const { attributesValuesIds, productId, ...restInput } = input;

    return this.productVariantService.updateOne(id, {
      ...restInput,
      attributesValues: attributesValuesIds,
      product: productId,
    });
  }
}
