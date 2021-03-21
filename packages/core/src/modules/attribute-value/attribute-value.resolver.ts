import { Injectable } from '@nestjs/common';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';

import { Allow } from '../../decorators';
import { Permission } from '../../common/permission.enum';
import { AttributeValueService } from './attribute-value.service';
import { NewAttributeValueInput, UpdateAttributeValueInput } from './dto';
import {
  CreateAttributeValueResponse,
  UpdateAttributeValueResponse,
} from './responses';
import { InputValidationPipe } from '../../middleware/input-validation.pipe';

@Resolver()
@Injectable()
export class AttributeValueResolver {
  constructor(private attributeValueService: AttributeValueService) {}

  @Allow(Permission.UpdateAttribute)
  @Mutation(() => CreateAttributeValueResponse)
  createAttributeValue(
    @Args('input', InputValidationPipe) input: NewAttributeValueInput,
  ): Promise<typeof CreateAttributeValueResponse> {
    const { attributeId, ...restInput } = input;

    return this.attributeValueService.insert({
      ...restInput,
      attribute: attributeId,
    });
  }

  @Allow(Permission.UpdateAttribute)
  @Mutation(() => UpdateAttributeValueResponse)
  updateAttributeValue(
    @Args('id', { type: () => Int }) id: number,
    @Args('input', InputValidationPipe) input: UpdateAttributeValueInput,
  ): Promise<typeof UpdateAttributeValueResponse> {
    return this.attributeValueService.updateOne(id, input);
  }
}
