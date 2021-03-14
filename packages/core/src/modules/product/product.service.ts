import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { BaseService } from "../shared/base.service";
import { ProductEntity } from "./product.entity";

@Injectable()
export class ProductService extends BaseService<ProductEntity> {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: EntityRepository<ProductEntity>
  ) {
    super(productRepo, "Product");
  }
}
