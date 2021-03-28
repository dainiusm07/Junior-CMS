import { Constructor } from '@mikro-orm/core';
import { IsEmail } from 'class-validator';

import { BaseEntity } from '../base.entity';
import { Unique } from './unique.constraint';

type BaseEntityWithEmail = BaseEntity & { email: string };

export function Email<T extends BaseEntityWithEmail>(
  entity: Constructor<T>,
): PropertyDecorator {
  return (object: object, propertyName: string | symbol) => {
    IsEmail({}, { message: 'error.invalid-email' })(object, propertyName);
    Unique(entity, 'email')(object, propertyName);
  };
}
