import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";

import { AttributeEntity } from "./attribute.entity";
import { AttributeResolver } from "./attribute.resolver";
import { AttributeService } from "./attribute.service";

@Module({
  imports: [MikroOrmModule.forFeature([AttributeEntity])],
  providers: [AttributeService, AttributeResolver],
  exports: [AttributeService],
})
export class AttributeModule {}
