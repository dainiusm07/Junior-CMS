import { Injectable } from "@nestjs/common";
import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { AttributeEntity } from "../attribute/attribute.entity";
import { ProductEntity } from "./product.entity";

@Resolver(() => ProductEntity)
@Injectable()
export class ProductEntityResolver {
  @ResolveField(() => [AttributeEntity])
  attributes(@Parent() product: ProductEntity) {
    return product.mapAttributes();
  }
}
