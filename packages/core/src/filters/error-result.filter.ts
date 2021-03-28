import { ArgumentsHost, Catch } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';

import { ErrorResult } from '../common/errors/error-result.error';
import { I18nService } from '../modules/i18n/i18n.service';
import { CmsContext } from '../types/CmsContext';

@Catch(ErrorResult)
export class ErrorResultFilter {
  constructor(private i18nService: I18nService) {}

  catch(error: ErrorResult, host: ArgumentsHost) {
    const { req }: CmsContext = GqlArgumentsHost.create(host).getContext();

    return this.i18nService.translateError(req, error);
  }
}
