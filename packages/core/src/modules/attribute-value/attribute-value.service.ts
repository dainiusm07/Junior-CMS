import { Injectable } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";

import { BaseService } from "../shared/base.service";
import { AttributeValueEntity } from "./attribute-value.entity";

@Injectable()
export class AttributeValueService extends BaseService<AttributeValueEntity> {
  constructor(
    @InjectRepository(AttributeValueEntity)
    private attributeValueRepo: EntityRepository<AttributeValueEntity>
  ) {
    super(attributeValueRepo, "Attribute value");
  }
}
