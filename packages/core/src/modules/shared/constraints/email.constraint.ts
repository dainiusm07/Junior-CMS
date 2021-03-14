import { Constructor } from "@mikro-orm/core";
import { IsEmail } from "class-validator";

import { BaseEntity } from "../base.entity";
import { Unique } from "./unique.constraint";

type BaseEntityWithEmail = BaseEntity & { email: string };

export function Email<T extends BaseEntityWithEmail>(
  entity: Constructor<T>
): PropertyDecorator {
  return (object: Object, propertyName: string | symbol) => {
    IsEmail()(object, propertyName);
    Unique("email", entity)(object, propertyName);
  };
}
