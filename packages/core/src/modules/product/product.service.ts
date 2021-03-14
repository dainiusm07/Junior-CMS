import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";

import { BaseService } from "../shared/base.service";
import { slugHelperMixin } from "../shared/mixins/slug-helper.mixin";
import { ProductEntity } from "./product.entity";

class BaseServiceDerived extends BaseService<ProductEntity> {}

const Mixins = slugHelperMixin(BaseServiceDerived);

@Injectable()
export class ProductService extends Mixins {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: EntityRepository<ProductEntity>
  ) {
    super(productRepo, "Product");
  }
}
