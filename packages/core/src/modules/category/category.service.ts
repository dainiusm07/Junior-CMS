import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";

import { BaseService } from "../shared/base.service";
import { slugHelperMixin } from "../shared/mixins/slug-helper.mixin";
import { CategoryEntity } from "./category.entity";

class BaseServiceDerived extends BaseService<CategoryEntity> {}

const Mixins = slugHelperMixin(BaseServiceDerived);

@Injectable()
export class CategoryService extends Mixins {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepo: EntityRepository<CategoryEntity>
  ) {
    super(categoryRepo, "Category");
  }
}
