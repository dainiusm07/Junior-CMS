import { MinLength } from 'class-validator';

export function CmsMinLength(length: number): PropertyDecorator {
  return (object: object, propertyName: string | symbol) => {
    MinLength(length, {
      message: `error.min-length-constraint`,
      context: { name: propertyName, number: length },
    })(object, propertyName);
  };
}
