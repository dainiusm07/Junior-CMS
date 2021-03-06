import { registerDecorator } from "class-validator";

export function NoWhiteSpace() {
  return ((target: Object, propertyName: string) => {
    registerDecorator({
      target: target.constructor,
      propertyName,
      name: "noWhiteSpace",
      validator: {
        validate(value) {
          return !/ /g.test(value);
        },
      },
      options: { message: "white spaces are not allowed" },
    });
  }) as PropertyDecorator;
}
