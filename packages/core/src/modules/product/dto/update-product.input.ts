import { InputType, PartialType } from '@nestjs/graphql';

import { NewProductInput } from './new-product.input';

@InputType()
export class UpdateProductInput extends PartialType(NewProductInput) {}
