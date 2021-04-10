import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { CATEGORIES_TREE_DEPTH } from '../../common/constants';
import { TranslatableEntityData } from '../../types/Translations';
import { BaseService } from '../shared/base.service';
import { translationsMixin } from '../shared/mixins/translations.mixin';
import { SlugHelper } from '../shared/slug-helper';
import { CategoryTranslation } from './category-translation.entity';
import { Category } from './category.entity';

// Settings
const categoriesPopulate =
  'children' + '.children'.repeat(CATEGORIES_TREE_DEPTH - 1);

@Injectable()
export class CategoryService extends translationsMixin<Category>(BaseService) {
  constructor(
    @InjectRepository(Category)
    protected _repo: EntityRepository<Category>,
    @InjectRepository(CategoryTranslation)
    protected _translationRepo: EntityRepository<CategoryTranslation>,
    private slugHelper: SlugHelper,
  ) {
    super();
  }

  getAvailableSlug(name: string) {
    return this.slugHelper.getAvailableSlug(this._translationRepo, name);
  }

  checkSlugAvailability(slug: string) {
    return this.slugHelper.checkSlugAvailability(this._translationRepo, slug);
  }

  async insert(data: TranslatableEntityData<Category>) {
    if (!data.slug) {
      data.slug = await this.getAvailableSlug(data.name);
    }

    return super.insert(data);
  }

  async addTranslation(data: TranslatableEntityData<CategoryTranslation>) {
    if (!data.slug) {
      data.slug = await this.getAvailableSlug(data.name);
    }

    return super.addTranslation(data);
  }

  getCategoriesTree(id?: number) {
    return this._repo.find(id ? { id } : { parent: null }, {
      populate: [categoriesPopulate],
    });
  }
}
