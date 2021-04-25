import { CoreUserFieldsFragment } from '../../../generated/gql-types';

export type ProfileUpdateFormValues = {
  firstname: string;
  lastname: string;
  password: string;
  confirmPassword: string;
  currentPassword: string;
};

export const getProfileUpdateFormInitialValues = ({
  firstname,
  lastname,
}: CoreUserFieldsFragment): ProfileUpdateFormValues => ({
  firstname,
  lastname,
  password: '',
  confirmPassword: '',
  currentPassword: '',
});
