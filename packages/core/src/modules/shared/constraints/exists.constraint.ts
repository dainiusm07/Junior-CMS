import { Constructor, RequestContext } from '@mikro-orm/core';
import { registerDecorator } from 'class-validator';
import { capitalizeFirstLetter } from '../../../utils/capitalize-first-letter';

import { formatEntityName } from '../../../utils/format-entity-name';

export function Exists<T extends object>(
  entity: Constructor<T>,
  findBy: keyof T,
): PropertyDecorator {
  return (object: object, propertyName: string | symbol) => {
    const name = formatEntityName(entity);

    registerDecorator({
      name: `does${capitalizeFirstLetter(name)}Exists`,
      target: object.constructor,
      propertyName: propertyName.toString(),
      async: true,
      validator: {
        async validate(value: string | string[]) {
          const em = RequestContext.getEntityManager();
          // Using em.count to not pollute the context
          const result = await em?.count(entity, { [findBy]: value });

          const shouldReceiveCount = Array.isArray(value) ? value.length : 1;

          return result === shouldReceiveCount;
        },
      },
      options: { message: `${name} doesn't exist` },
    });
  };
}
