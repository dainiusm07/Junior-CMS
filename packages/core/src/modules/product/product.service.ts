import { EntityData, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { PRODUCT_ATTRIBUTES_LOADER } from '../../common/constants';
import { usePopulationLoader } from '../../utils/use-population-loader';
import { BaseService } from '../shared/base.service';
import { slugHelperMixin } from '../shared/mixins/slug-helper.mixin';
import { ProductEntity } from './product.entity';

class BaseServiceDerived extends BaseService<ProductEntity> {}

const Mixins = slugHelperMixin(BaseServiceDerived);

@Injectable()
export class ProductService extends Mixins {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: EntityRepository<ProductEntity>
  ) {
    super(productRepo, "Product");
  }

  async insert(data: EntityData<ProductEntity>) {
    if (!data.slug) {
      data.slug = await this.getAvailableSlug(data.name);
    }

    return super.insert(data);
  }

  async getAttributes(ctx: any, product: ProductEntity) {
    return usePopulationLoader(
      ctx,
      this.productRepo,
      PRODUCT_ATTRIBUTES_LOADER,
      { attributesValues: { attribute: true } }
    )
      .load(product)
      .then((result) => this.mapLoadedAttributes(result));
  }

  private mapLoadedAttributes(product: ProductEntity) {
    if (!product.attributesValues.isInitialized(true)) {
      return [];
    }

    const attributesValues = product.attributesValues.getItems();

    const attributes = [
      ...new Set(attributesValues.map(({ attribute }) => attribute)),
    ].map((attribute) => {
      const values = attributesValues.filter(
        (value) => value.attribute.id === attribute.id
      );

      return Object.assign(attribute, { values });
    });

    return attributes;
  }
}
