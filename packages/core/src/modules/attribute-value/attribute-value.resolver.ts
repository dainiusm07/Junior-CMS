import { Injectable } from '@nestjs/common';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';

import { Allow } from '../../decorators';
import { Permission } from '../../common/permission.enum';
import { AttributeValueService } from './attribute-value.service';
import { NewAttributeValueInput, UpdateAttributeValueInput } from './dto';
import {
  AddAttributeValueTranslationResponse,
  CreateAttributeValueResponse,
  UpdateAttributeValueResponse,
} from './responses';
import { InputValidationPipe } from '../../middleware';
import { AttributeValue } from './attribute-value.entity';
import { Ctx } from '../../decorators/ctx.decorator';
import { CmsContext } from '../../types/CmsContext';
import { Translated } from '../../types/Translations';
import { NewAttributeValueTranslationInput } from './dto/new-attribute-value-translation.input';

type TranslatedAttributeValue = Translated<AttributeValue>;

@Resolver()
@Injectable()
export class AttributeValueResolver {
  constructor(private attributeValueService: AttributeValueService) {}

  @Allow(Permission.UpdateAttribute)
  @Mutation(() => CreateAttributeValueResponse)
  createAttributeValue(
    @Args('input', InputValidationPipe) input: NewAttributeValueInput,
    @Ctx() { languageCode }: CmsContext,
  ): Promise<TranslatedAttributeValue> {
    const { attributeId, ...restInput } = input;

    return this.attributeValueService.insert({
      ...restInput,
      languageCode,
      attribute: attributeId,
    });
  }

  @Allow(Permission.UpdateAttribute)
  @Mutation(() => UpdateAttributeValueResponse)
  updateAttributeValue(
    @Args('id', { type: () => Int }) id: number,
    @Args('input', InputValidationPipe) input: UpdateAttributeValueInput,
    @Ctx() ctx: CmsContext,
  ): Promise<TranslatedAttributeValue> {
    return this.attributeValueService.updateOne(ctx, { id }, input);
  }

  @Allow(Permission.UpdateAttribute)
  @Mutation(() => AddAttributeValueTranslationResponse)
  addAttributeValueTranslation(
    @Args('input', InputValidationPipe)
    input: NewAttributeValueTranslationInput,
    @Ctx() { languageCode }: CmsContext,
  ) {
    const { attributeValueId, ...restInput } = input;

    return this.attributeValueService.addTranslation({
      ...restInput,
      languageCode,
      attributeValue: attributeValueId,
    });
  }
}
