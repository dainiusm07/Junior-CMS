import { Matches, MaxLength, MinLength } from 'class-validator';
import { NoWhiteSpace } from './no-whitespace.constraint';

const minLength = 6;
const maxLength = 120;

export function Password(): PropertyDecorator {
  return (object: object, propertyName: string | symbol) => {
    MinLength(minLength)(object, propertyName);
    MaxLength(maxLength)(object, propertyName);
    Matches(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])((?=.*d)|(?=.*[@$!%*?&]))[A-Za-zd@$!%*?&]',
      ),
      {
        message:
          'Password must contain one lowercase letter, one uppercase letter and one number or special character',
      },
    )(object, propertyName);
    NoWhiteSpace()(object, propertyName);
  };
}
