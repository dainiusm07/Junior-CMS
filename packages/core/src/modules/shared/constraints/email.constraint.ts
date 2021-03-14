import { Constructor, RequestContext } from "@mikro-orm/core";
import {
  IsEmail,
  registerDecorator,
  ValidationArguments,
} from "class-validator";

import { BaseEntity } from "../base.entity";

export function Email<T extends BaseEntity & { email: string }>(
  entity: Constructor<T>
): PropertyDecorator {
  return (object: Object, propertyName: string | symbol) => {
    IsEmail()(object, propertyName);

    registerDecorator({
      name: "isEmailUnique",
      target: object.constructor,
      propertyName: propertyName.toString(),
      async: true,
      validator: {
        async validate(value: string, args: ValidationArguments) {
          const em = RequestContext.getEntityManager()!;
          // Using em.count to not pollute the context
          const result = await em.count(entity, { email: value });

          return !Boolean(result);
        },
      },
      options: { message: "Email must be unique" },
    });
  };
}
