import { EntityData, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CATEGORIES_TREE_DEPTH } from '../../common/constants';

import { BaseService } from '../shared/base.service';
import { slugHelperMixin } from '../shared/mixins/slug-helper.mixin';
import { Category } from './category.entity';

// Mixins
class BaseServiceDerived extends BaseService<Category> {}

const Mixins = slugHelperMixin(BaseServiceDerived);

// Settings
const categoriesPopulate =
  'children' + '.children'.repeat(CATEGORIES_TREE_DEPTH - 1);

@Injectable()
export class CategoryService extends Mixins {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: EntityRepository<Category>,
  ) {
    super(categoryRepo, 'Category');
  }

  async insert(data: EntityData<Category>) {
    if (!data.slug) {
      data.slug = await this.getAvailableSlug(data.name);
    }

    return super.insert(data);
  }

  getCategoriesTree(id?: number) {
    return this.find(id ? { id } : { parent: null }, {
      populate: [categoriesPopulate],
    });
  }
}
