import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { Attribute } from './attribute.entity';
import { AttributeResolver } from './attribute.resolver';
import { AttributeService } from './attribute.service';

@Module({
  imports: [MikroOrmModule.forFeature([Attribute])],
  providers: [AttributeService, AttributeResolver],
  exports: [AttributeService],
})
export class AttributeModule {}
