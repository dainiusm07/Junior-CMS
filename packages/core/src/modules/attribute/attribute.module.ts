import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { AttributeTranslation } from './attribute-translation.entity';
import { Attribute } from './attribute.entity';
import { AttributeResolver } from './attribute.resolver';
import { AttributeEntityResolver } from './attribute-entity.resolver';
import { AttributeService } from './attribute.service';

@Module({
  imports: [MikroOrmModule.forFeature([Attribute, AttributeTranslation])],
  providers: [AttributeService, AttributeResolver, AttributeEntityResolver],
  exports: [AttributeService],
})
export class AttributeModule {}
