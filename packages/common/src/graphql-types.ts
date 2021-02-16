export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Upload: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  createRole: Role;
  createUser: User;
  loginUser?: Maybe<User>;
  logoutUser?: Maybe<Scalars['Boolean']>;
  updateRole: Role;
  updateUser: User;
};


export type MutationCreateRoleArgs = {
  input: CreateRoleInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationLoginUserArgs = {
  input?: Maybe<NativeAuthInput>;
};


export type MutationUpdateRoleArgs = {
  id: Scalars['Int'];
  input: UpdateRoleInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['Int'];
  input: UpdateUserInput;
};

export type NativeAuthInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};



export type Query = {
  __typename?: 'Query';
  permissions: Array<PermissionDefinition>;
  role?: Maybe<Role>;
  roles: Array<Role>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryRoleArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['Int'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  permissions: Array<Permission>;
};

export type PermissionDefinition = {
  __typename?: 'PermissionDefinition';
  group: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
};

export type CreateRoleInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  permissions: Array<Permission>;
};

export type UpdateRoleInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Permission>>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  updatedAt: Scalars['Date'];
  createdAt: Scalars['Date'];
  deletedAt?: Maybe<Scalars['Date']>;
  roles: Array<Maybe<Role>>;
};

export type CreateUserInput = {
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  roleIds: Array<Scalars['Int']>;
};

export type UpdateUserInput = {
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  roleIds?: Maybe<Array<Scalars['Int']>>;
};

export enum Permission {
  Owner = 'Owner',
  CreateUser = 'CreateUser',
  ReadUser = 'ReadUser',
  UpdateUser = 'UpdateUser',
  DeleteUser = 'DeleteUser',
  ReadUsers = 'ReadUsers',
  AssignRole = 'AssignRole',
  CreateRole = 'CreateRole',
  ReadRole = 'ReadRole',
  UpdateRole = 'UpdateRole',
  DeleteRole = 'DeleteRole',
  ReadRoles = 'ReadRoles'
}
