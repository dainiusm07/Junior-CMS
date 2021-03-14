import { Field, InputType, Int } from "@nestjs/graphql";

import { PartialEntity } from "../../../types";
import { ProductEntity } from "../product.entity";

@InputType()
export class NewProductInput implements PartialEntity<ProductEntity> {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  price: number;
}