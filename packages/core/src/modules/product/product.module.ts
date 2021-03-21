import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { ProductEntityResolver } from './product-entity.resolver';
import { Product } from './product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [MikroOrmModule.forFeature([Product])],
  providers: [ProductService, ProductResolver, ProductEntityResolver],
  exports: [ProductService],
})
export class ProductModule {}
