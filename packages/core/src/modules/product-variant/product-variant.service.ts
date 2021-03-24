import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { PRODUCT_VARIANT_ATTRIBUTES_LOADER } from '../../common/constants';
import { usePopulationLoader } from '../../utils/use-population-loader';
import { BaseService } from '../shared/base.service';
import { SlugHelper } from '../shared/slug-helper';
import { ProductVariant } from './product-variant.entity';

@Injectable()
export class ProductVariantService extends BaseService<ProductVariant> {
  constructor(
    @InjectRepository(ProductVariant)
    protected _repo: EntityRepository<ProductVariant>,
    private slugHelper: SlugHelper,
  ) {
    super();
  }

  getAvailableSlug(name: string) {
    return this.slugHelper.getAvailableSlug(this._repo, name);
  }

  checkSlugAvailability(slug: string) {
    return this.slugHelper.checkSlugAvailability(this._repo, slug);
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
