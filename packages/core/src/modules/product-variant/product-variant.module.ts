import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { SlugHelper } from '../shared/helpers';
import { ProductVariantEntityResolver } from './product-variant-entity.resolver';
import { ProductVariant } from './product-variant.entity';
import { ProductVariantResolver } from './product-variant.resolver';
import { ProductVariantService } from './product-variant.service';

@Module({
  imports: [MikroOrmModule.forFeature([ProductVariant])],
  providers: [
    ProductVariantService,
    ProductVariantResolver,
    ProductVariantEntityResolver,
    SlugHelper,
  ],
  exports: [ProductVariantService],
})
export class ProductVariantModule {}
