import { Injectable } from '@nestjs/common';
import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ProductVariant } from '../product-variant/product-variant.entity';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Resolver(() => Product)
@Injectable()
export class ProductEntityResolver {
  constructor(private productService: ProductService) {}

  @ResolveField(() => [ProductVariant])
  variants(@Context() ctx: any, @Parent() product: Product) {
    return this.productService.getVariants(ctx, product);
  }
}
