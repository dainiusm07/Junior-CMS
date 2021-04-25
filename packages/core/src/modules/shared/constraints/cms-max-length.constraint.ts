import { MaxLength } from 'class-validator';

export function CmsMaxLength(length: number): PropertyDecorator {
  return (object: object, propertyName: string | symbol) => {
    MaxLength(length, {
      message: `error.max-length-constraint`,
      context: { name: propertyName, number: length },
    })(object, propertyName);
  };
}
