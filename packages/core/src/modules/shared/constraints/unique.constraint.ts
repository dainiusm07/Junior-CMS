import { Constructor, RequestContext } from '@mikro-orm/core';
import { registerDecorator } from 'class-validator';
import { capitalizeFirstLetter } from '../../../utils/capitalize-first-letter';

import { BaseEntity } from '../base.entity';

export function Unique<T extends BaseEntity>(
  entity: Constructor<T>,
  field: keyof T,
): PropertyDecorator {
  return (object: object, propertyName: string | symbol) => {
    const fieldName = capitalizeFirstLetter(field);

    registerDecorator({
      name: `is${fieldName}Unique`,
      target: object.constructor,
      propertyName: propertyName.toString(),
      async: true,
      validator: {
        async validate(value: string) {
          const em = RequestContext.getEntityManager();
          // Using em.count to not pollute the context
          const result = await em?.count(entity, { [field]: value });

          return !Boolean(result);
        },
      },
      options: { message: `${fieldName} must be unique` },
    });
  };
}
