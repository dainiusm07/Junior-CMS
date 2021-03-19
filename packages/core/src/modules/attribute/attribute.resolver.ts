import { LoadStrategy } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";

import { Permission } from "../../common/permission.enum";
import { Allow } from "../../decorators";
import { InputValidationPipe } from "../../middleware/input-validation.pipe";
import { AttributeEntity } from "./attribute.entity";
import { AttributeService } from "./attribute.service";
import { NewAttributeInput, UpdateAttributeInput } from "./dto";
import {
  AttributeResponse,
  CreateAttributeResponse,
  UpdateAttributeResponse,
} from "./responses";

@Resolver()
@Injectable()
export class AttributeResolver {
  constructor(private attributeService: AttributeService) {}

  @Allow(Permission.ReadAttribute)
  @Query(() => AttributeResponse)
  attribute(
    @Args("id", { type: () => Int }) id: number
  ): Promise<typeof AttributeResponse> {
    return this.attributeService.findOneOrFail(
      { id },
      { populate: { values: LoadStrategy.JOINED } }
    );
  }

  @Allow(Permission.ReadAttribute)
  @Query(() => [AttributeEntity])
  attributes(): Promise<AttributeEntity[]> {
    return this.attributeService.find(
      {},
      { populate: { values: LoadStrategy.JOINED } }
    );
  }

  @Allow(Permission.CreateAttribute)
  @Mutation(() => CreateAttributeResponse)
  createAttribute(
    @Args("input", InputValidationPipe) input: NewAttributeInput
  ): Promise<typeof CreateAttributeResponse> {
    return this.attributeService.insert(input);
  }

  @Allow(Permission.UpdateAttribute)
  @Mutation(() => UpdateAttributeResponse)
  updateAttribute(
    @Args("id", { type: () => Int }) id: number,
    @Args("input", InputValidationPipe) input: UpdateAttributeInput
  ): Promise<typeof UpdateAttributeResponse> {
    return this.attributeService.updateOne(id, input);
  }
}
