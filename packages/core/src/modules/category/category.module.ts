import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { SlugHelper } from '../shared/helpers';
import { CategoryEntityResolver } from './category-entity.resolver';
import { CategoryTranslation } from './category-translation.entity';
import { Category } from './category.entity';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';

@Module({
  imports: [MikroOrmModule.forFeature([Category, CategoryTranslation])],
  providers: [
    CategoryService,
    CategoryResolver,
    CategoryEntityResolver,
    SlugHelper,
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
