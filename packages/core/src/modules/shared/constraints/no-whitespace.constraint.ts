import { registerDecorator } from 'class-validator';

export function NoWhiteSpace(): PropertyDecorator {
  return (target: object, propertyName: string | symbol) => {
    registerDecorator({
      target: target.constructor,
      propertyName: propertyName.toString(),
      name: 'noWhiteSpace',
      validator: {
        validate(value) {
          return !/ /g.test(value);
        },
      },
      options: { message: 'error.no-white-space' },
    });
  };
}
