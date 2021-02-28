import { EntityRepository } from "@mikro-orm/core";
import { number } from "yup";
import { CreateUserInput } from "@junior-cms/common";

import { SchemaGenFunc } from "../../../types";
import { RoleEntity } from "../../role/role.entity";
import { emailValidation } from "../../shared/validations/email.validation";
import { passwordValidation } from "../../shared/validations/password.validation";
import { UserEntity } from "../user.entity";

export const roleIdValidation = <T extends RoleEntity>(
  repo: EntityRepository<T>
) => {
  return number().test(
    "roleExists",
    "Role doesn't exist",
    async (value?: number) => {
      if (value === undefined) return true;
      const entity = await repo.findOne({ id: value } as never);
      return Boolean(entity);
    }
  );
};

export const createUserValidation: SchemaGenFunc<CreateUserInput> = (em) => {
  return {
    password: passwordValidation,
    email: emailValidation(em.getRepository(UserEntity)),
    roleId: roleIdValidation(em.getRepository(RoleEntity)),
  };
};
