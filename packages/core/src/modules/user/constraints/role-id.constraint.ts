import { RequestContext } from "@mikro-orm/core";
import { registerDecorator } from "class-validator";

import { RoleEntity } from "../../role/role.entity";

export function RoleId() {
  return ((target: Object, propertyName: string) => {
    registerDecorator({
      target: target.constructor,
      propertyName,
      async: true,
      name: "roleExist",
      validator: {
        async validate(value: number) {
          const em = RequestContext.getEntityManager()!;
          const role = await em.findOne(RoleEntity, { id: value });

          return Boolean(role);
        },
      },
      options: {
        message: "role doesn't exists",
      },
    });
  }) as PropertyDecorator;
}
