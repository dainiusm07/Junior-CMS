import { NotFoundError } from '@mikro-orm/core';
import { ArgumentsHost, Catch } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';

import { ErrorResult } from '../common/errors/error-result.error';
import { I18nService } from '../i18n/i18n.service';
import { CmsContext } from '../types/CmsContext';

@Catch(NotFoundError)
export class NotFoundFilter {
  constructor(private i18nService: I18nService) {}

  catch(exception: NotFoundError, host: ArgumentsHost) {
    const entityName = exception.message.split(' ')[0];

    const { req }: CmsContext = GqlArgumentsHost.create(host).getContext();

    const error = ErrorResult.notFound(entityName);

    return this.i18nService.translateError(req, error);
  }
}
