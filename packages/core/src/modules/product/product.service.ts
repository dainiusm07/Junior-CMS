import { EntityData, EntityRepository, FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { PRODUCT_VARIANTS_LOADER } from '../../common/constants';
import { CmsContext } from '../../types/CmsContext';
import { Translated, TranslatableEntityData } from '../../types/Translations';
import { usePopulationLoader } from '../../utils/use-population-loader';
import { SlugHelper, TranslatableEntityHelper } from '../shared/helpers';
import { ProductTranslation } from './product-translation.entity';
import { Product } from './product.entity';
import { IListOptions } from '../shared/list-utils';

@Injectable()
export class ProductService {
  private entityHelper: TranslatableEntityHelper<Product>;

  constructor(
    @InjectRepository(Product)
    protected _repo: EntityRepository<Product>,
    @InjectRepository(ProductTranslation)
    protected _translationRepo: EntityRepository<ProductTranslation>,
    private slugHelper: SlugHelper,
  ) {
    this.entityHelper = new TranslatableEntityHelper(_repo, _translationRepo);
  }

  async findOneOrFail(
    { languageCode }: CmsContext,
    where: FilterQuery<Product>,
  ): Promise<Translated<Product>> {
    return this.entityHelper.findOneOrFail(where, undefined, languageCode);
  }

  findList({ languageCode }: CmsContext, options: IListOptions<Product>) {
    return this.entityHelper.findList(options, languageCode);
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

    return this.entityHelper.insert(data);
  }

  updateOne(
    { languageCode }: CmsContext,
    filter: FilterQuery<Product>,
    data: EntityData<Product>,
  ) {
    return this.entityHelper.updateOne(filter, data, languageCode);
  }

  async addTranslation(data: TranslatableEntityData<ProductTranslation>) {
    if (!data.slug && data.name) {
      data.slug = await this.getAvailableSlug(data.name);
    }

    return this.entityHelper.addTranslation(data);
  }

  getVariants(ctx: any, product: Product) {
    return usePopulationLoader(ctx, this._repo, PRODUCT_VARIANTS_LOADER, {
      variants: true,
    })
      .load(product)
      .then((result) => result.variants.getItems());
  }
}
