import { Constructor, RequestContext } from '@mikro-orm/core';
import { registerDecorator } from 'class-validator';

export function Unique<T extends object>(
  entity: Constructor<T>,
  field: keyof T,
): PropertyDecorator {
  return (object: object, propertyName: string | symbol) => {
    registerDecorator({
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
      options: { message: 'error.must-be-unique', context: { name: field } },
    });
  };
}
