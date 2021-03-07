import { InputType, PartialType } from "@nestjs/graphql";

import { NewUserInput } from "./new-user.input";

@InputType()
export class UpdateUserInput extends PartialType(NewUserInput) {}
