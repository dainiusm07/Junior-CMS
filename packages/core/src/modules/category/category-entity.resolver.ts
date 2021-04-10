import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Ctx } from '../../decorators/ctx.decorator';
import { CmsContext } from '../../types/CmsContext';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Resolver(() => Category)
export class CategoryEntityResolver {
  constructor(private categoryService: CategoryService) {}

  @ResolveField(() => [Category])
  children(
    @Parent() { children }: Category,
    @Ctx() { languageCode }: CmsContext,
  ) {
    return this.categoryService.translateChildren(
      children.getItems(false),
      languageCode,
    );
  }

  @ResolveField(() => Category, { nullable: true })
  parent(@Parent() category: Category, @Ctx() ctx: CmsContext) {
    return this.categoryService.getParent(ctx, category);
  }
}
