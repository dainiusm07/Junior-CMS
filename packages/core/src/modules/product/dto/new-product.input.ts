import { Field, InputType, Int } from "@nestjs/graphql";

import { PartialEntity } from "../../../types";
import { CategoryEntity } from "../../category/category.entity";
import { Exists } from "../../shared/constraints/exists.constraint";
import { Unique } from "../../shared/constraints/unique.constraint";
import { ProductEntity } from "../product.entity";

@InputType()
export class NewProductInput implements PartialEntity<ProductEntity> {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  price: number;

  @Unique(ProductEntity, "slug")
  @Field({ nullable: true })
  slug?: string;

  @Exists(CategoryEntity, "id", "Category")
  @Field()
  categoryId: number;

  @Field(() => [Int])
  attributesValuesIds: number[];
}
