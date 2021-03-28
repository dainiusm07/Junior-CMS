import { Injectable } from '@nestjs/common';
import { ExpressContext } from 'apollo-server-express';

import { I18nError } from './i18n.error';

type Request = ExpressContext['req'];

@Injectable()
export class I18nService {
  translateError({ __: t }: Request, error: I18nError) {
    const variables: Record<string, string> = {};

    if (error.translate) {
      error.translate(t);
    }

    if (error.variables) {
      Object.entries(error.variables).forEach(([key, value]) => {
        variables[key] = t(String(value));
      });
    }

    const translation = t(error.message, variables);
    error.message = translation;

    return error;
  }
}
