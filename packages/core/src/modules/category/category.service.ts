import { EntityData, EntityRepository, FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { CATEGORIES_TREE_DEPTH } from '../../common/constants';
import { LanguageCode } from '../../i18n/language-code.enum';
import { CmsContext } from '../../types/CmsContext';
import { TranslatableEntityData, Translated } from '../../types/Translations';
import {
  SlugHelper,
  TranslatableEntityHelper,
  translateEntity,
} from '../shared/helpers';
import { IListOptions } from '../shared/list-utils';
import { CategoryTranslation } from './category-translation.entity';
import { Category } from './category.entity';

// Settings
const categoriesPopulate =
  'children' + '.children'.repeat(CATEGORIES_TREE_DEPTH - 1);

@Injectable()
export class CategoryService {
  private entityHelper: TranslatableEntityHelper<Category>;

  constructor(
    @InjectRepository(Category)
    protected _repo: EntityRepository<Category>,
    @InjectRepository(CategoryTranslation)
    protected _translationRepo: EntityRepository<CategoryTranslation>,
    private slugHelper: SlugHelper,
  ) {
    this.entityHelper = new TranslatableEntityHelper(_repo, _translationRepo);
  }

  findOneOrFail(ctx: CmsContext, filter: FilterQuery<Category>) {
    return this.entityHelper.findOneOrFail(filter, undefined, ctx);
  }

  findList(ctx: CmsContext, options: IListOptions<Category>) {
    return this.entityHelper.findList(options, ctx);
  }

  async insert(data: TranslatableEntityData<Category>) {
    if (!data.slug) {
      data.slug = await this.getAvailableSlug(data.name);
    }

    return this.entityHelper.insert(data);
  }

  updateOne(
    filter: FilterQuery<Category> & { translations: unknown },
    data: EntityData<Category>,
  ) {
    return this.entityHelper.updateOne(filter, data);
  }

  async addTranslation(data: TranslatableEntityData<CategoryTranslation>) {
    if (!data.slug) {
      data.slug = await this.getAvailableSlug(data.name);
    }

    return this.entityHelper.addTranslation(data);
  }

  getAvailableSlug(name: string) {
    return this.slugHelper.getAvailableSlug(this._translationRepo, name);
  }

  checkSlugAvailability(slug: string) {
    return this.slugHelper.checkSlugAvailability(this._translationRepo, slug);
  }

  async getCategoriesTree(ctx: CmsContext, id?: number) {
    return this._repo
      .find(id ? { id } : { parent: null }, {
        populate: [categoriesPopulate],
      })
      .then((categories) =>
        this.translateChildren(categories, ctx.languageCode),
      );
  }

  translateChildren(
    categories: Category[],
    languageCode: LanguageCode,
  ): Translated<Category>[] {
    return categories.map((category) =>
      translateEntity(category, languageCode),
    );
  }
}
