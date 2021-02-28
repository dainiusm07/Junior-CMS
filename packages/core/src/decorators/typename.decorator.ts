import { OnInit } from "@mikro-orm/core";

export function Typename(typename: string): ClassDecorator {
  return function (constructor: Function) {
    const methodName = "__setTypename";

    Object.defineProperty(constructor.prototype, methodName, {
      value: function () {
        this.__typename = typename;
      },
    });

    OnInit()(constructor.prototype, methodName);
  };
}
