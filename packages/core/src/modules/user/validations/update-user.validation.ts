import { UpdateUserInput } from "@junior-cms/common";

import { SchemaGenFunc } from "../../../types";
import { createUserValidation } from "./create-user.validation";

export const updateUserValidation: SchemaGenFunc<UpdateUserInput> = (em) => {
  return {
    ...createUserValidation(em),
  };
};
