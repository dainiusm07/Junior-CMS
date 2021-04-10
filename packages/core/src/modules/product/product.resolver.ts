import { Injectable } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Permission } from '../../common/permission.enum';
import { Allow } from '../../decorators';
import { Ctx } from '../../decorators/ctx.decorator';
import { InputValidationPipe } from '../../middleware';
import { CmsContext } from '../../types/CmsContext';
import { Translated } from '../../types/Translations';
import { IListResponse } from '../shared/list-utils';
import {
  NewProductInput,
  ProductListOptions,
  UpdateProductInput,
  NewProductTranslationInput,
} from './dto';
import { ProductTranslation } from './product-translation.entity';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import {
  AddProductTranslationResponse,
  CreateProductResponse,
  ProductListResponse,
  ProductResponse,
  UpdateProductResponse,
} from './responses';

type TranslatedProduct = Translated<Product>;

@Resolver()
@Injectable()
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Allow(Permission.ReadProduct)
  @Query(() => ProductResponse)
  async product(
    @Args('id', { type: () => Int }) id: number,
    @Ctx() ctx: CmsContext,
  ): Promise<TranslatedProduct> {
    return this.productService.findOneOrFail(ctx, { id });
  }

  @Allow(Permission.ReadProduct)
  @Query(() => ProductListResponse)
  products(
    @Args() options: ProductListOptions,
    @Ctx() ctx: CmsContext,
  ): Promise<IListResponse<TranslatedProduct>> {
    return this.productService.findList(ctx, options);
  }

  @Allow(Permission.CreateProduct)
  @Mutation(() => CreateProductResponse)
  async createProduct(
    @Args('input', InputValidationPipe) input: NewProductInput,
    @Ctx() { languageCode }: CmsContext,
  ): Promise<TranslatedProduct> {
    const { categoryId, ...restInput } = input;

    return this.productService.insert({
      ...restInput,
      category: categoryId,
      languageCode,
    });
  }

  @Allow(Permission.UpdateProduct)
  @Mutation(() => UpdateProductResponse)
  updateProduct(
    @Args('id', { type: () => Int }) id: number,
    @Args('input', InputValidationPipe) input: UpdateProductInput,
    @Ctx() { languageCode }: CmsContext,
  ): Promise<TranslatedProduct> {
    const { categoryId, ...restInput } = input;

    return this.productService.updateOne(
      { id, translations: { languageCode } },
      {
        ...restInput,
        category: categoryId,
      },
    );
  }

  @Allow(Permission.UpdateProduct)
  @Mutation(() => AddProductTranslationResponse)
  addProductTranslation(
    @Args('input', InputValidationPipe) input: NewProductTranslationInput,
    @Ctx() { languageCode }: CmsContext,
  ): Promise<ProductTranslation> {
    const { productId, ...restInput } = input;

    return this.productService.addTranslation({
      ...restInput,
      languageCode,
      product: productId,
    });
  }
}
