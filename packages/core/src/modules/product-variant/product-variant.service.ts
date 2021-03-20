import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { PRODUCT_VARIANT_ATTRIBUTES_LOADER } from '../../common/constants';
import { usePopulationLoader } from '../../utils/use-population-loader';
import { BaseService } from '../shared/base.service';
import { slugHelperMixin } from '../shared/mixins/slug-helper.mixin';
import { ProductVariantEntity } from './product-variant.entity';

class BaseServiceDerived extends BaseService<ProductVariantEntity> {}

const Mixins = slugHelperMixin(BaseServiceDerived);

@Injectable()
export class ProductVariantService extends Mixins {
  constructor(
    @InjectRepository(ProductVariantEntity)
    private productVariantRepo: EntityRepository<ProductVariantEntity>
  ) {
    super(productVariantRepo, "Product variant");
  }

  async getAttributes(ctx: any, product: ProductVariantEntity) {
    return usePopulationLoader(
      ctx,
      this.productVariantRepo,
      PRODUCT_VARIANT_ATTRIBUTES_LOADER,
      { attributesValues: { attribute: true } }
    )
      .load(product)
      .then((result) => this.mapLoadedAttributes(result));
  }

  private mapLoadedAttributes(product: ProductVariantEntity) {
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
