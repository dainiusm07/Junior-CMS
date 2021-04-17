import { CoreUserFieldsFragment, Permission } from '../../generated/gql-types';

export const mockUser = ({
  permissions = [],
  isAdmin = false,
}: {
  permissions?: Permission[];
  isAdmin?: boolean;
}): CoreUserFieldsFragment => ({
  __typename: 'User',
  createdAt: 'a',
  email: 'test@test.com',
  firstname: 'Firstname',
  lastname: 'Lastname',
  id: 1,
  role: { __typename: 'Role', name: 'Test-role', isAdmin, permissions },
});
