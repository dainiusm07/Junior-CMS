import { Injectable, UseFilters } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Permission } from '../../common/permission.enum';
import { Allow } from '../../decorators';
import { InputValidationFilter, NotFoundFilter } from '../../filters';
import { InputValidationPipe } from '../../middleware/input-validation.pipe';
import { Attribute } from './attribute.entity';
import { AttributeService } from './attribute.service';
import { NewAttributeInput, UpdateAttributeInput } from './dto';
import {
  AttributeResponse,
  CreateAttributeResponse,
  UpdateAttributeResponse,
} from './responses';

@Resolver()
@Injectable()
@UseFilters(InputValidationFilter, NotFoundFilter)
export class AttributeResolver {
  constructor(private attributeService: AttributeService) {}

  @Allow(Permission.ReadAttribute)
  @Query(() => AttributeResponse)
  attribute(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<typeof AttributeResponse> {
    return this.attributeService.findOneOrFail({ id });
  }

  @Allow(Permission.ReadAttribute)
  @Query(() => [Attribute])
  attributes(): Promise<Attribute[]> {
    return this.attributeService.findAll();
  }

  @Allow(Permission.CreateAttribute)
  @Mutation(() => CreateAttributeResponse)
  createAttribute(
    @Args('input', InputValidationPipe) input: NewAttributeInput,
  ): Promise<typeof CreateAttributeResponse> {
    return this.attributeService.insert(input);
  }

  @Allow(Permission.UpdateAttribute)
  @Mutation(() => UpdateAttributeResponse)
  updateAttribute(
    @Args('id', { type: () => Int }) id: number,
    @Args('input', InputValidationPipe) input: UpdateAttributeInput,
  ): Promise<typeof UpdateAttributeResponse> {
    return this.attributeService.updateOne(id, input);
  }
}
