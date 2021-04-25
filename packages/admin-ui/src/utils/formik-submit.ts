import { FormikHelpers } from 'formik';

import { ValidationError } from '../generated/gql-types';

type CustomHelpers = {
  setErrors: (errors: ValidationError[]) => void;
};

type ModifiedFormikHelpers<T> = Omit<FormikHelpers<T>, 'setErrors'> &
  CustomHelpers;

type SubmitFn<T extends object> = (
  values: T,
  helpers: ModifiedFormikHelpers<T>,
) => void | Promise<unknown>;

export const formikSubmit = <T extends object>(submitFn: SubmitFn<T>) => {
  return (
    values: T,
    { setErrors: formikSetErrors, ...restHelpers }: FormikHelpers<T>,
  ) =>
    submitFn(values, {
      ...restHelpers,
      setErrors: (validationErrors) => {
        const errorsEntries = validationErrors.map((error) => [
          error.path,
          error.messages.join('\n'),
        ]);

        formikSetErrors(Object.fromEntries(errorsEntries));
      },
    });
};
