import { Field, InputType, Int } from "@nestjs/graphql";

import { PartialEntity } from "../../../types";
import { Exists } from "../../shared/constraints/exists.constraint";
import { Unique } from "../../shared/constraints/unique.constraint";
import { CategoryEntity } from "../category.entity";

@InputType()
export class NewCategoryInput implements PartialEntity<CategoryEntity> {
  @Field()
  name: string;

  @Unique(CategoryEntity, "slug")
  @Field({ nullable: true })
  slug?: string;

  @Exists(CategoryEntity, "id", "Category")
  @Field(() => Int, { nullable: true })
  parentId: number;
}
