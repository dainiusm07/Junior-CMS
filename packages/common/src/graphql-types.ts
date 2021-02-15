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

export enum Permission {
  Owner = 'Owner',
  CreateUser = 'CreateUser',
  ReadUser = 'ReadUser',
  UpdateUser = 'UpdateUser',
  DeleteUser = 'DeleteUser',
  ReadUsers = 'ReadUsers'
}

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  loginUser?: Maybe<User>;
  logoutUser?: Maybe<Scalars['Boolean']>;
  updateUser: User;
};


export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserInput>;
};


export type MutationLoginUserArgs = {
  input?: Maybe<NativeAuthInput>;
};


export type MutationUpdateUserArgs = {
  id: Scalars['Int'];
  input?: Maybe<UpdateUserInput>;
};

export type NativeAuthInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};



export type Query = {
  __typename?: 'Query';
  users?: Maybe<Array<Maybe<User>>>;
  user?: Maybe<User>;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
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
};

export type CreateUserInput = {
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UpdateUserInput = {
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};
