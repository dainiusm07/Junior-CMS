import { Injectable } from '@nestjs/common';
import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ProductVariantEntity } from '../product-variant/product-variant.entity';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@Resolver(() => ProductEntity)
@Injectable()
export class ProductEntityResolver {
  constructor(private productService: ProductService) {}

  @ResolveField(() => [ProductVariantEntity])
  variants(@Context() ctx: any, @Parent() product: ProductEntity) {
    return this.productService.getVariants(ctx, product);
  }
}
