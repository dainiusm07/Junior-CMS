import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { SlugHelper } from '../shared/slug-helper';
import { Category } from './category.entity';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';

@Module({
  imports: [MikroOrmModule.forFeature([Category])],
  providers: [CategoryService, CategoryResolver, SlugHelper],
  exports: [CategoryService],
})
export class CategoryModule {}
