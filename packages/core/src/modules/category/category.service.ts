import { EntityData, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CATEGORIES_TREE_DEPTH } from '../../common/constants';

import { BaseService } from '../shared/base.service';
import { SlugHelper } from '../shared/slug-helper';
import { Category } from './category.entity';

// Settings
const categoriesPopulate =
  'children' + '.children'.repeat(CATEGORIES_TREE_DEPTH - 1);

@Injectable()
export class CategoryService extends BaseService<Category> {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: EntityRepository<Category>,
    private slugHelper: SlugHelper,
  ) {
    super(categoryRepo);
  }

  getAvailableSlug(name: string) {
    return this.slugHelper.getAvailableSlug(this.categoryRepo, name);
  }

  checkSlugAvailability(slug: string) {
    return this.slugHelper.checkSlugAvailability(this.categoryRepo, slug);
  }

  async insert(data: EntityData<Category>) {
    if (!data.slug) {
      data.slug = await this.getAvailableSlug(data.name);
    }

    return super.insert(data);
  }

  getCategoriesTree(id?: number) {
    return this.categoryRepo.find(id ? { id } : { parent: null }, {
      populate: [categoriesPopulate],
    });
  }
}
