import { EntityRepository, FilterQuery, LoadStrategy } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { PRODUCT_VARIANTS_LOADER } from '../../common/constants';
import { usePopulationLoader } from '../../utils/use-population-loader';
import { BaseService } from '../shared/base.service';
import { IListOptions } from '../shared/list-utils';
import { Product } from './product.entity';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product)
    private productRepo: EntityRepository<Product>,
  ) {
    super(productRepo);
  }

  async findOneOrFail(where: FilterQuery<Product>) {
    return super.findOneOrFail(where, {
      populate: { variants: true },
      strategy: LoadStrategy.JOINED,
    });
  }

  async findList(options: IListOptions<Product>) {
    return super.findList(options);
  }

  getVariants(ctx: any, product: Product) {
    return usePopulationLoader(ctx, this.productRepo, PRODUCT_VARIANTS_LOADER, {
      variants: true,
    })
      .load(product)
      .then((result) => result.variants.getItems());
  }
}
