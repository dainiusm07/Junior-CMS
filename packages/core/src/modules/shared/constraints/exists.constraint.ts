import { Constructor, RequestContext } from "@mikro-orm/core";
import { registerDecorator, ValidationArguments } from "class-validator";
import { capitalizeFirstLetter } from "../../../utils/capitalize-first-letter";

import { BaseEntity } from "../base.entity";

export function Exists<T extends BaseEntity>(
  entity: Constructor<T>,
  findBy: keyof T,
  typeName: string
): PropertyDecorator {
  return (object: Object, propertyName: string | symbol) => {
    const name = capitalizeFirstLetter(typeName);

    registerDecorator({
      name: `does${name}Exists`,
      target: object.constructor,
      propertyName: propertyName.toString(),
      async: true,
      validator: {
        async validate(value: string, args: ValidationArguments) {
          const em = RequestContext.getEntityManager()!;
          // Using em.count to not pollute the context
          const result = await em.count(entity, { [findBy]: value });

          return Boolean(result);
        },
      },
      options: { message: `${name} doesn't exist` },
    });
  };
}
