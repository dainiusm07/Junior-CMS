import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { Catch } from '@nestjs/common';
import { ResultError } from '../common/errors/result.error';

@Catch(UniqueConstraintViolationException)
export class UniqueConstraintFilter {
  catch(exception: any) {
    const detail: string = exception.detail;

    const matches = detail.match(/\(([^)]+)\)/);

    if (matches) {
      const properties = matches[1].split(', ');

      return ResultError.notFound(properties.join('.'));
    }

    throw Error();
  }
}
