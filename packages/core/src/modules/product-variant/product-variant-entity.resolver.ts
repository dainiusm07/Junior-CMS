import { Injectable } from '@nestjs/common';
import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Attribute } from '../attribute/attribute.entity';
import { ProductVariant } from './product-variant.entity';
import { ProductVariantService } from './product-variant.service';

@Resolver(() => ProductVariant)
@Injectable()
export class ProductVariantEntityResolver {
  constructor(private productVariantService: ProductVariantService) {}

  @ResolveField(() => [Attribute])
  attributes(@Context() ctx: any, @Parent() variant: ProductVariant) {
    return this.productVariantService.getAttributes(ctx, variant);
  }
}
