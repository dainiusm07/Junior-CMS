import {
  CoreUserFieldsFragment,
  Permission,
} from '../../../generated/gql-types';

export const mockUser = ({
  permissions = [],
}: {
  permissions?: Permission[];
}): CoreUserFieldsFragment => ({
  __typename: 'User',
  createdAt: 'a',
  email: 'test@test.com',
  firstname: 'Firstname',
  lastname: 'Lastname',
  id: 1,
  role: { __typename: 'Role', name: 'Test-role', permissions },
});
