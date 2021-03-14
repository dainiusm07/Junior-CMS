import { createUnionType, ObjectType } from "@nestjs/graphql";

import { InputValidationError } from "../../common/errors/input-validation.error";
import { NotFoundError } from "../../common/errors/not-found.error";
import { generateListResponse } from "../shared/list-utils";
import { ProductEntity } from "./product.entity";

export const ProductResponse = createUnionType({
  name: "ProductResponse",
  types: () => [ProductEntity, NotFoundError],
});

export const UpdateProductResponse = createUnionType({
  name: "UpdateProductResponse",
  types: () => [ProductEntity, InputValidationError, NotFoundError],
});

export const CreateProductResponse = createUnionType({
  name: "CreateProductResponse",
  types: () => [ProductEntity, InputValidationError],
});

@ObjectType()
export class ProductListResponse extends generateListResponse(ProductEntity) {}
