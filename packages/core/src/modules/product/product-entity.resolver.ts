import { Injectable } from '@nestjs/common';
import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AttributeEntity } from '../attribute/attribute.entity';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@Resolver(() => ProductEntity)
@Injectable()
export class ProductEntityResolver {
  constructor(private productService: ProductService) {}

  @ResolveField(() => [AttributeEntity])
  attributes(@Parent() product: ProductEntity, @Context() ctx: any) {
    return this.productService.getAttributes(ctx, product);
  }
}
