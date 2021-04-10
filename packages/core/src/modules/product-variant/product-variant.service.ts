import { EntityData, EntityRepository, FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { PRODUCT_VARIANT_ATTRIBUTES_LOADER } from '../../common/constants';
import { usePopulationLoader } from '../../utils/use-population-loader';
import { EntityHelper } from '../shared/helpers';
import { ProductVariant } from './product-variant.entity';

@Injectable()
export class ProductVariantService {
  private entityHelper: EntityHelper<ProductVariant>;

  constructor(
    @InjectRepository(ProductVariant)
    protected _repo: EntityRepository<ProductVariant>,
  ) {
    this.entityHelper = new EntityHelper(_repo);
  }

  insert(data: EntityData<ProductVariant>) {
    return this.entityHelper.insert(data);
  }

  updateOne(
    filter: FilterQuery<ProductVariant>,
    data: EntityData<ProductVariant>,
  ) {
    return this.entityHelper.updateOne(filter, data);
  }

  async getAttributes(ctx: any, product: ProductVariant) {
    return usePopulationLoader(
      ctx,
      this._repo,
      PRODUCT_VARIANT_ATTRIBUTES_LOADER,
      { attributesValues: { attribute: true } },
    )
      .load(product)
      .then((result) => this.mapLoadedAttributes(result));
  }

  private mapLoadedAttributes(product: ProductVariant) {
    if (!product.attributesValues.isInitialized(true)) {
      return [];
    }

    const attributesValues = product.attributesValues.getItems();

    const attributes = [
      ...new Set(attributesValues.map(({ attribute }) => attribute)),
    ].map((attribute) => {
      const values = attributesValues.filter(
        (value) => value.attribute.id === attribute.id,
      );

      return Object.assign(attribute, { values });
    });

    return attributes;
  }
}
