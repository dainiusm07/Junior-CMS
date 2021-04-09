import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { AttributeValueTranslation } from './attribute-value-translation.entity';
import { AttributeValue } from './attribute-value.entity';
import { AttributeValueResolver } from './attribute-value.resolver';
import { AttributeValueService } from './attribute-value.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([AttributeValue, AttributeValueTranslation]),
  ],
  providers: [AttributeValueService, AttributeValueResolver],
  exports: [AttributeValueService],
})
export class AttributeValueModule {}
