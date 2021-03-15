import { InputType, PartialType } from "@nestjs/graphql";

import { NewCategoryInput } from "./new-category.input";

@InputType()
export class UpdateCategoryInput extends PartialType(NewCategoryInput) {}
