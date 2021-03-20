import { Injectable } from '@nestjs/common';
import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AttributeEntity } from '../attribute/attribute.entity';
import { ProductVariantEntity } from './product-variant.entity';
import { ProductVariantService } from './product-variant.service';

@Resolver(() => ProductVariantEntity)
@Injectable()
export class ProductVariantEntityResolver {
  constructor(private productVariantService: ProductVariantService) {}

  @ResolveField(() => [AttributeEntity])
  attributes(@Context() ctx: any, @Parent() variant: ProductVariantEntity) {
    return this.productVariantService.getAttributes(ctx, variant);
  }
}
