import { InputType, PartialType } from '@nestjs/graphql';

import { NewProductVariantInput } from './new-product-variant.input';

@InputType()
export class UpdateProductVariantInput extends PartialType(
  NewProductVariantInput,
) {}
