import { NotFoundError } from '@mikro-orm/core';
import { Catch } from '@nestjs/common';

import { ResultError } from '../common/errors/result.error';

@Catch(NotFoundError)
export class NotFoundFilter {
  catch(exception: NotFoundError) {
    const entityName = exception.message.split(' ')[0];

    return ResultError.notFound(entityName);
  }
}
