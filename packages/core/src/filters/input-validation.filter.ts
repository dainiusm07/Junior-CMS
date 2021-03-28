import { ArgumentsHost, Catch } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';

import { InputValidationError } from '../common/errors/input-validation.error';
import { I18nService } from '../i18n/i18n.service';
import { CmsContext } from '../types/CmsContext';

@Catch(InputValidationError)
export class InputValidationFilter {
  constructor(private i18nService: I18nService) {}

  catch(exception: InputValidationError, host: ArgumentsHost) {
    const { req }: CmsContext = GqlArgumentsHost.create(host).getContext();

    return this.i18nService.translateError(req, exception);
  }
}
