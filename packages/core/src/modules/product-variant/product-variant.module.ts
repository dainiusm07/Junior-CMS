import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { ProductVariantEntityResolver } from './product-variant-entity.resolver';
import { ProductVariantEntity } from './product-variant.entity';
import { ProductVariantResolver } from './product-variant.resolver';
import { ProductVariantService } from './product-variant.service';

@Module({
  imports: [MikroOrmModule.forFeature([ProductVariantEntity])],
  providers: [
    ProductVariantService,
    ProductVariantResolver,
    ProductVariantEntityResolver,
  ],
  exports: [ProductVariantService],
})
export class ProductVariantModule {}
