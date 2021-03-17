import { Injectable } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";

import { AttributeEntity } from "./attribute.entity";
import { BaseService } from "../shared/base.service";

@Injectable()
export class AttributeService extends BaseService<AttributeEntity> {
  constructor(
    @InjectRepository(AttributeEntity)
    private attributeRepo: EntityRepository<AttributeEntity>
  ) {
    super(attributeRepo, "Attribute");
  }
}
