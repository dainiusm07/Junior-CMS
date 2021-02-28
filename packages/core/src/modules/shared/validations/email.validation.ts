import { EntityRepository } from "@mikro-orm/core";
import { string } from "yup";

export const emailValidation = <T extends { email: string }>(
  repo: EntityRepository<T>
) => {
  return string()
    .email()
    .test("isEmailUnique", "Email is already taken", async (value?: string) => {
      if (!value) return false;
      const entity = await repo.findOne({ email: value } as never);
      return !entity;
    });
};
