import { Injectable } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Permission } from '../../common/permission.enum';
import { Allow } from '../../decorators';
import { Ctx } from '../../decorators/ctx.decorator';
import { InputValidationPipe } from '../../middleware';
import { CmsContext } from '../../types/CmsContext';
import { Translated } from '../../types/Translations';
import { AttributeTranslation } from './attribute-translation.entity';
import { Attribute } from './attribute.entity';
import { AttributeService } from './attribute.service';
import {
  NewAttributeInput,
  UpdateAttributeInput,
  NewAttributeTranslationInput,
} from './dto';
import {
  AddAttributeTranslationResponse,
  AttributeResponse,
  CreateAttributeResponse,
  UpdateAttributeResponse,
} from './responses';

type TranslatedAttribute = Translated<Attribute>;

@Resolver()
@Injectable()
export class AttributeResolver {
  constructor(private attributeService: AttributeService) {}

  @Allow(Permission.ReadAttribute)
  @Query(() => AttributeResponse)
  attribute(
    @Args('id', { type: () => Int }) id: number,
    @Ctx() ctx: CmsContext,
  ): Promise<TranslatedAttribute> {
    return this.attributeService.findOneOrFail({ id }, undefined, ctx);
  }

  @Allow(Permission.ReadAttribute)
  @Query(() => [Attribute])
  attributes(
    @Ctx() { languageCode }: CmsContext,
  ): Promise<TranslatedAttribute[]> {
    return this.attributeService.findAll(languageCode);
  }

  @Allow(Permission.CreateAttribute)
  @Mutation(() => CreateAttributeResponse)
  createAttribute(
    @Args('input', InputValidationPipe) input: NewAttributeInput,
    @Ctx() { languageCode }: CmsContext,
  ): Promise<TranslatedAttribute> {
    return this.attributeService.insert({ ...input, languageCode });
  }

  @Allow(Permission.UpdateAttribute)
  @Mutation(() => UpdateAttributeResponse)
  updateAttribute(
    @Args('id', { type: () => Int }) id: number,
    @Args('input', InputValidationPipe) input: UpdateAttributeInput,
    @Ctx() { languageCode }: CmsContext,
  ): Promise<TranslatedAttribute> {
    return this.attributeService.updateOne(
      { id, translations: { languageCode } },
      input,
    );
  }

  @Allow(Permission.UpdateAttribute)
  @Mutation(() => AddAttributeTranslationResponse)
  addAttributeTranslation(
    @Args('input', InputValidationPipe) input: NewAttributeTranslationInput,
    @Ctx() { languageCode }: CmsContext,
  ): Promise<AttributeTranslation> {
    const { attributeId, ...restInput } = input;

    return this.attributeService.addTranslation({
      ...restInput,
      languageCode,
      attribute: attributeId,
    });
  }
}
