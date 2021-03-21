import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { PRODUCT_VARIANTS_LOADER } from '../../common/constants';
import { usePopulationLoader } from '../../utils/use-population-loader';
import { BaseService } from '../shared/base.service';
import { Product } from './product.entity';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product)
    private productRepo: EntityRepository<Product>,
  ) {
    super(productRepo, 'Product');
  }

  getVariants(ctx: any, product: Product) {
    return usePopulationLoader(ctx, this.productRepo, PRODUCT_VARIANTS_LOADER, {
      variants: true,
    })
      .load(product)
      .then((result) => result.variants.getItems());
  }
}
