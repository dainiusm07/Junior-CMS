import { InputType, PartialType } from "@nestjs/graphql";

import { NewRoleInput } from "./new-role.input";

@InputType()
export class UpdateRoleInput extends PartialType(NewRoleInput) {}
