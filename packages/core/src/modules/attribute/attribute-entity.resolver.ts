import { Injectable } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AttributeValue } from '../attribute-value/attribute-value.entity';
import { Attribute } from './attribute.entity';
import { AttributeService } from './attribute.service';
import { Ctx } from '../../decorators/ctx.decorator';
import { CmsContext } from '../../types/CmsContext';
import { Translated } from '../../types/Translations';

@Resolver(() => Attribute)
@Injectable()
export class AttributeEntityResolver {
  constructor(private attributeService: AttributeService) {}

  @ResolveField(() => [AttributeValue])
  values(
    @Ctx() ctx: CmsContext,
    @Parent() attribute: Attribute,
  ): Translated<AttributeValue>[] {
    const attributeValues = this.attributeService.translateAttributeValues(
      ctx,
      attribute.values.getItems(),
    );

    return attributeValues;
  }
}
