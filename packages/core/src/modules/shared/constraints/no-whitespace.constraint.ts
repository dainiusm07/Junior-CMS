import { registerDecorator } from "class-validator";

export function NoWhiteSpace(): PropertyDecorator {
  return (target: Object, propertyName: string | symbol) => {
    registerDecorator({
      target: target.constructor,
      propertyName: propertyName.toString(),
      name: "noWhiteSpace",
      validator: {
        validate(value) {
          return !/ /g.test(value);
        },
      },
      options: { message: "white spaces are not allowed" },
    });
  };
}
