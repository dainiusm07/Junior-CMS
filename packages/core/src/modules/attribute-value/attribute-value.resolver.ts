import { Injectable } from "@nestjs/common";
import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";

import { Allow, InputValidation } from "../../decorators";
import { Permission } from "../../common/permission.enum";
import { AttributeValueService } from "./attribute-value.service";
import { NewAttributeValueInput, UpdateAttributeValueInput } from "./dto";
import {
  CreateAttributeValueResponse,
  UpdateAttributeValueResponse,
} from "./responses";

@Resolver()
@Injectable()
@InputValidation()
export class AttributeValueResolver {
  constructor(private attributeValueService: AttributeValueService) {}

  @Allow(Permission.UpdateAttribute)
  @Mutation(() => CreateAttributeValueResponse)
  createAttributeValue(
    @Args("input") input: NewAttributeValueInput
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
    @Args("id", { type: () => Int }) id: number,
    @Args("input") input: UpdateAttributeValueInput
  ): Promise<typeof UpdateAttributeValueResponse> {
    return this.attributeValueService.updateOne(id, input);
  }
}
