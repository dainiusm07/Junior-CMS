import { CoreUserFieldsFragment } from '../../../generated/gql-types';

export type ProfileUpdateFormProps = JSX.IntrinsicElements['div'] & {
  user: CoreUserFieldsFragment;
};
