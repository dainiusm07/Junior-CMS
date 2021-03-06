import { Constructor, RequestContext } from "@mikro-orm/core";
import {
  IsEmail,
  registerDecorator,
  ValidationArguments,
} from "class-validator";

import { BaseEntity } from "../base.entity";

export function Email<T extends BaseEntity & { email: string }>(
  entity: Constructor<T>
) {
  return ((object: Object, propertyName: string) => {
    IsEmail()(object, propertyName);

    registerDecorator({
      name: "isEmailUnique",
      target: object.constructor,
      async: true,
      propertyName,
      validator: {
        async validate(value: string, args: ValidationArguments) {
          const em = RequestContext.getEntityManager()!;
          const result = await em.findOne(entity, { email: value });

          return !Boolean(result);
        },
      },
      options: { message: "Email must be unique" },
    });
  }) as PropertyDecorator;
}
