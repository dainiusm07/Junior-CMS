import { UseFilters, UsePipes } from "@nestjs/common";

import { InputValidationFilter } from "../middleware/input-validation.filter";
import { InputValidationPipe } from "../middleware/input-validation.pipe";

export function InputValidation() {
  return ((target: Function) => {
    UsePipes(InputValidationPipe)(target);
    UseFilters(InputValidationFilter)(target);
  }) as ClassDecorator;
}