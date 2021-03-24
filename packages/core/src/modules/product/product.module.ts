import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { SlugHelper } from '../shared/slug-helper';

import { ProductEntityResolver } from './product-entity.resolver';
import { ProductTranslation } from './product-translation.entity';
import { Product } from './product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [MikroOrmModule.forFeature([Product, ProductTranslation])],
  providers: [
    ProductService,
    ProductResolver,
    ProductEntityResolver,
    SlugHelper,
  ],
  exports: [ProductService],
})
export class ProductModule {}
