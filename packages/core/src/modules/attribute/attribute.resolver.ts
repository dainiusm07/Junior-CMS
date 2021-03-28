import { Injectable } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Permission } from '../../common/permission.enum';
import { Allow } from '../../decorators';
import { InputValidationPipe } from '../../middleware';
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
export class AttributeResolver {
  constructor(private attributeService: AttributeService) {}

  @Allow(Permission.ReadAttribute)
  @Query(() => AttributeResponse)
  attribute(@Args('id', { type: () => Int }) id: number): Promise<Attribute> {
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
  ): Promise<Attribute> {
    return this.attributeService.insert(input);
  }

  @Allow(Permission.UpdateAttribute)
  @Mutation(() => UpdateAttributeResponse)
  updateAttribute(
    @Args('id', { type: () => Int }) id: number,
    @Args('input', InputValidationPipe) input: UpdateAttributeInput,
  ): Promise<Attribute> {
    return this.attributeService.updateOne(id, input);
  }
}
