import { Constructor } from "@mikro-orm/core";

export const optionalProperties = <T>(cls: Constructor<T>) => {
  return cls as Constructor<
    {
      [K in keyof T]?: T[K];
    }
  >;
};
