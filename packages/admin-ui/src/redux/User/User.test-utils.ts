import { CoreUserFieldsFragment, Permission } from '../../generated/gql-types';

export const mockUser = ({
  permissions = [],
  isAdmin = false,
  firstname = 'Firstname',
  lastname = 'Lastname',
}: {
  permissions?: Permission[];
  isAdmin?: boolean;
  firstname?: string;
  lastname?: string;
}): CoreUserFieldsFragment => ({
  __typename: 'User',
  createdAt: 'a',
  updatedAt: 'a',
  email: 'test@test.com',
  firstname,
  lastname,
  id: 1,
  role: { __typename: 'Role', name: 'Test-role', isAdmin, permissions },
});
