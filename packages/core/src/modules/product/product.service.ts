import { EntityRepository, FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { PRODUCT_VARIANTS_LOADER } from '../../common/constants';
import { CmsContext } from '../../types/CmsContext';
import { Translated, TranslatableEntityData } from '../../types/Translations';
import { usePopulationLoader } from '../../utils/use-population-loader';
import { BaseService } from '../shared/base.service';
import { translationsMixin } from '../shared/mixins/translations.mixin';
import { SlugHelper } from '../shared/slug-helper';
import { ProductTranslation } from './product-translation.entity';
import { Product } from './product.entity';

@Injectable()
export class ProductService extends translationsMixin<Product>(BaseService) {
  constructor(
    @InjectRepository(Product)
    protected _repo: EntityRepository<Product>,
    @InjectRepository(ProductTranslation)
    protected _translationRepo: EntityRepository<ProductTranslation>,
    private slugHelper: SlugHelper,
  ) {
    super();
  }

  async findOneOrFail(
    where: FilterQuery<Product>,
    options: undefined,
    ctx: CmsContext,
  ): Promise<Translated<Product>> {
    return super.findOneOrFail(where, options, ctx);
  }

  getAvailableSlug(name: string) {
    return this.slugHelper.getAvailableSlug(this._translationRepo, name);
  }

  checkSlugAvailability(slug: string) {
    return this.slugHelper.checkSlugAvailability(this._translationRepo, slug);
  }

  async insert(
    data: TranslatableEntityData<Product>,
  ): Promise<Translated<Product>> {
    if (!data.slug && data.name) {
      data.slug = await this.getAvailableSlug(data.name);
    }

    return super.insert(data);
  }

  async addTranslation(data: TranslatableEntityData<ProductTranslation>) {
    if (!data.slug && data.name) {
      data.slug = await this.getAvailableSlug(data.name);
    }

    return super.addTranslation(data);
  }

  getVariants(ctx: any, product: Product) {
    return usePopulationLoader(ctx, this._repo, PRODUCT_VARIANTS_LOADER, {
      variants: true,
    })
      .load(product)
      .then((result) => result.variants.getItems());
  }
}
