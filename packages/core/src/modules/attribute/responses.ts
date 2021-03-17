import { createUnionType } from "@nestjs/graphql";

import { InputValidationError } from "../../common/errors/input-validation.error";
import { NotFoundError } from "../../common/errors/not-found.error";
import { AttributeEntity } from "./attribute.entity";

export const AttributeResponse = createUnionType({
  name: "AttributeResponse",
  types: () => [AttributeEntity, NotFoundError],
});

export const UpdateAttributeResponse = createUnionType({
  name: "UpdateAttributeResponse",
  types: () => [AttributeEntity, InputValidationError, NotFoundError],
});

export const CreateAttributeResponse = createUnionType({
  name: "CreateAttributeResponse",
  types: () => [AttributeEntity, InputValidationError],
});
