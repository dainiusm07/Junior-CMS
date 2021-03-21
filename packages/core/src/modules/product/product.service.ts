import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { PRODUCT_VARIANTS_LOADER } from '../../common/constants';
import { usePopulationLoader } from '../../utils/use-population-loader';
import { BaseService } from '../shared/base.service';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService extends BaseService<ProductEntity> {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: EntityRepository<ProductEntity>,
  ) {
    super(productRepo, 'Product');
  }

  getVariants(ctx: any, product: ProductEntity) {
    return usePopulationLoader(ctx, this.productRepo, PRODUCT_VARIANTS_LOADER, {
      variants: true,
    })
      .load(product)
      .then((result) => result.variants.getItems());
  }
}
