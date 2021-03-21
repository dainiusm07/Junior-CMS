import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { AttributeValueEntity } from './attribute-value.entity';
import { AttributeValueResolver } from './attribute-value.resolver';
import { AttributeValueService } from './attribute-value.service';

@Module({
  imports: [MikroOrmModule.forFeature([AttributeValueEntity])],
  providers: [AttributeValueService, AttributeValueResolver],
  exports: [AttributeValueService],
})
export class AttributeValueModule {}
