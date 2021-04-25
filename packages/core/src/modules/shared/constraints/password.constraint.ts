import { Matches } from 'class-validator';
import { CmsMaxLength } from './cms-max-length.constraint';
import { NoWhiteSpace } from './no-whitespace.constraint';

const minLength = 6;
const maxLength = 120;

export function Password(): PropertyDecorator {
  return (object: object, propertyName: string | symbol) => {
    CmsMaxLength(minLength)(object, propertyName);
    CmsMaxLength(maxLength)(object, propertyName);
    Matches(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])((?=.*d)|(?=.*[@$!%*?&]))[A-Za-zd@$!%*?&]',
      ),
      {
        message: 'error.password-constraint',
      },
    )(object, propertyName);
    NoWhiteSpace()(object, propertyName);
  };
}
