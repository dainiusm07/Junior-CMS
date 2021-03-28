import { Matches, MaxLength, MinLength } from 'class-validator';
import { NoWhiteSpace } from './no-whitespace.constraint';

const minLength = 6;
const maxLength = 120;

export function Password(): PropertyDecorator {
  return (object: object, propertyName: string | symbol) => {
    MinLength(minLength, {
      message: `error.min-length-constraint`,
      context: { name: 'password', number: minLength },
    })(object, propertyName);
    MaxLength(maxLength, {
      message: `error.max-length-constraint`,
      context: { name: 'password', number: minLength },
    })(object, propertyName);
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
