import { Catch } from '@nestjs/common';

import { InputValidationError } from '../common/errors/input-validation.error';

@Catch(InputValidationError)
export class InputValidationFilter {
  catch(exception: InputValidationError) {
    return exception;
  }
}
