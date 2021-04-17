export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type PaginationResult = {
  __typename: 'PaginationResult';
  currentPage: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Role = {
  __typename: 'Role';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  isAdmin: Scalars['Boolean'];
  permissions: Array<Permission>;
};

export enum Permission {
  CreateUser = 'CreateUser',
  ReadUser = 'ReadUser',
  UpdateUser = 'UpdateUser',
  DeleteUser = 'DeleteUser',
  CreateRole = 'CreateRole',
  ReadRole = 'ReadRole',
  UpdateRole = 'UpdateRole',
  DeleteRole = 'DeleteRole',
  CreateProduct = 'CreateProduct',
  ReadProduct = 'ReadProduct',
  UpdateProduct = 'UpdateProduct',
  DeleteProduct = 'DeleteProduct',
  CreateCategory = 'CreateCategory',
  ReadCategory = 'ReadCategory',
  UpdateCategory = 'UpdateCategory',
  DeleteCategory = 'DeleteCategory',
  CreateAttribute = 'CreateAttribute',
  ReadAttribute = 'ReadAttribute',
  UpdateAttribute = 'UpdateAttribute',
  DeleteAttribute = 'DeleteAttribute',
}

export type User = {
  __typename: 'User';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt: Maybe<Scalars['DateTime']>;
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  role: Role;
};

export type Attribute = {
  __typename: 'Attribute';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  values: Array<AttributeValue>;
  languageCode: LanguageCode;
  name: Scalars['String'];
};

export enum LanguageCode {
  En = 'EN',
  Lt = 'LT',
}

export type AttributeValue = {
  __typename: 'AttributeValue';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  value: Scalars['String'];
};

export type ValidationError = {
  __typename: 'ValidationError';
  path: Scalars['String'];
  messages: Array<Scalars['String']>;
};

export type Category = {
  __typename: 'Category';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt: Maybe<Scalars['DateTime']>;
  active: Scalars['Boolean'];
  parent: Maybe<Category>;
  children: Array<Category>;
  languageCode: LanguageCode;
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type CategoryListResponse = {
  __typename: 'CategoryListResponse';
  items: Array<Category>;
  totalItems: Scalars['Int'];
  pagination: PaginationResult;
};

export type ProductTranslation = {
  __typename: 'ProductTranslation';
  languageCode: LanguageCode;
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  slug: Scalars['String'];
  description: Maybe<Scalars['String']>;
};

export type Product = {
  __typename: 'Product';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt: Maybe<Scalars['DateTime']>;
  variants: Array<ProductVariant>;
  translations: ProductTranslation;
  languageCode: LanguageCode;
  name: Scalars['String'];
  slug: Scalars['String'];
  description: Maybe<Scalars['String']>;
};

export type ProductVariant = {
  __typename: 'ProductVariant';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt: Maybe<Scalars['DateTime']>;
  sku: Scalars['String'];
  price: Scalars['Int'];
  attributes: Array<Attribute>;
};

export type ProductListResponse = {
  __typename: 'ProductListResponse';
  items: Array<Product>;
  totalItems: Scalars['Int'];
  pagination: PaginationResult;
};

export type RoleListResponse = {
  __typename: 'RoleListResponse';
  items: Array<Role>;
  totalItems: Scalars['Int'];
  pagination: PaginationResult;
};

export type UserListResponse = {
  __typename: 'UserListResponse';
  items: Array<User>;
  totalItems: Scalars['Int'];
  pagination: PaginationResult;
};

export type Query = {
  __typename: 'Query';
  attribute: AttributeResponse;
  attributes: Array<Attribute>;
  categoriesTree: Array<Category>;
  category: CategoryResponse;
  categories: CategoryListResponse;
  isCategorySlugAvailable: Scalars['Boolean'];
  getCategorySlug: Scalars['String'];
  product: ProductResponse;
  products: ProductListResponse;
  user: UserResponse;
  users: UserListResponse;
  userProfile: Maybe<User>;
  roles: RoleListResponse;
  role: RoleResponse;
};

export type QueryAttributeArgs = {
  id: Scalars['Int'];
};

export type QueryCategoriesTreeArgs = {
  id: Maybe<Scalars['Int']>;
};

export type QueryCategoryArgs = {
  id: Scalars['Int'];
};

export type QueryCategoriesArgs = {
  filter: ExtendedCategoryFilterOptions;
  sort: CategorySortOptions;
  page: Scalars['Int'];
  limit: Scalars['Int'];
};

export type QueryIsCategorySlugAvailableArgs = {
  slug: Scalars['String'];
};

export type QueryGetCategorySlugArgs = {
  name: Scalars['String'];
};

export type QueryProductArgs = {
  id: Scalars['Int'];
};

export type QueryProductsArgs = {
  filter: ExtendedProductFilterOptions;
  sort: ProductSortOptions;
  page: Scalars['Int'];
  limit: Scalars['Int'];
};

export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type QueryUsersArgs = {
  filter: ExtendedUserFilterOptions;
  sort: UserSortOptions;
  page: Scalars['Int'];
  limit: Scalars['Int'];
};

export type QueryRolesArgs = {
  filter: ExtendedRoleFilterOptions;
  sort: RoleSortOptions;
  page: Scalars['Int'];
  limit: Scalars['Int'];
};

export type QueryRoleArgs = {
  id: Scalars['Int'];
};

export type AttributeResponse = Attribute | ErrorResult;

export type ErrorResult = {
  __typename: 'ErrorResult';
  message: Scalars['String'];
  errorCode: Scalars['String'];
};

export type CategoryResponse = Category | ErrorResult;

export type ExtendedCategoryFilterOptions = {
  id: Maybe<NumberOperators>;
  updatedAt: Maybe<DateOperators>;
  createdAt: Maybe<DateOperators>;
  name: Maybe<StringOperators>;
  _and: Maybe<Array<CategoryFilterOptions>>;
  _or: Maybe<Array<CategoryFilterOptions>>;
};

export type NumberOperators = {
  _gt: Maybe<Scalars['Float']>;
  _lt: Maybe<Scalars['Float']>;
  _eq: Maybe<Scalars['Float']>;
  _in: Maybe<Array<Scalars['Float']>>;
  _nin: Maybe<Array<Scalars['Float']>>;
};

export type DateOperators = {
  _gte: Maybe<Scalars['DateTime']>;
  _lte: Maybe<Scalars['DateTime']>;
};

export type StringOperators = {
  _ilike: Maybe<Scalars['String']>;
  _eq: Maybe<Scalars['String']>;
};

export type CategoryFilterOptions = {
  id: Maybe<NumberOperators>;
  updatedAt: Maybe<DateOperators>;
  createdAt: Maybe<DateOperators>;
  name: Maybe<StringOperators>;
};

export type CategorySortOptions = {
  id: Maybe<SortOrder>;
  updatedAt: Maybe<SortOrder>;
  createdAt: Maybe<SortOrder>;
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type ProductResponse = Product | ErrorResult;

export type ExtendedProductFilterOptions = {
  id: Maybe<NumberOperators>;
  updatedAt: Maybe<DateOperators>;
  createdAt: Maybe<DateOperators>;
  name: Maybe<StringOperators>;
  description: Maybe<StringOperators>;
  price: Maybe<NumberOperators>;
  deletedAt: Maybe<DateOperators>;
  _and: Maybe<Array<ProductFilterOptions>>;
  _or: Maybe<Array<ProductFilterOptions>>;
};

export type ProductFilterOptions = {
  id: Maybe<NumberOperators>;
  updatedAt: Maybe<DateOperators>;
  createdAt: Maybe<DateOperators>;
  name: Maybe<StringOperators>;
  description: Maybe<StringOperators>;
  price: Maybe<NumberOperators>;
  deletedAt: Maybe<DateOperators>;
};

export type ProductSortOptions = {
  id: Maybe<SortOrder>;
  updatedAt: Maybe<SortOrder>;
  createdAt: Maybe<SortOrder>;
};

export type UserResponse = User | ErrorResult;

export type ExtendedUserFilterOptions = {
  id: Maybe<NumberOperators>;
  updatedAt: Maybe<DateOperators>;
  createdAt: Maybe<DateOperators>;
  email: Maybe<StringOperators>;
  firstname: Maybe<StringOperators>;
  lastname: Maybe<StringOperators>;
  deletedAt: Maybe<DateOperators>;
  _and: Maybe<Array<UserFilterOptions>>;
  _or: Maybe<Array<UserFilterOptions>>;
};

export type UserFilterOptions = {
  id: Maybe<NumberOperators>;
  updatedAt: Maybe<DateOperators>;
  createdAt: Maybe<DateOperators>;
  email: Maybe<StringOperators>;
  firstname: Maybe<StringOperators>;
  lastname: Maybe<StringOperators>;
  deletedAt: Maybe<DateOperators>;
};

export type UserSortOptions = {
  id: Maybe<SortOrder>;
  updatedAt: Maybe<SortOrder>;
  createdAt: Maybe<SortOrder>;
  email: Maybe<SortOrder>;
};

export type ExtendedRoleFilterOptions = {
  id: Maybe<NumberOperators>;
  updatedAt: Maybe<DateOperators>;
  createdAt: Maybe<DateOperators>;
  name: Maybe<StringOperators>;
  _and: Maybe<Array<RoleFilterOptions>>;
  _or: Maybe<Array<RoleFilterOptions>>;
};

export type RoleFilterOptions = {
  id: Maybe<NumberOperators>;
  updatedAt: Maybe<DateOperators>;
  createdAt: Maybe<DateOperators>;
  name: Maybe<StringOperators>;
};

export type RoleSortOptions = {
  id: Maybe<SortOrder>;
  updatedAt: Maybe<SortOrder>;
  createdAt: Maybe<SortOrder>;
};

export type RoleResponse = Role | ErrorResult;

export type Mutation = {
  __typename: 'Mutation';
  createAttributeValue: CreateAttributeValueResponse;
  updateAttributeValue: UpdateAttributeValueResponse;
  addAttributeValueTranslation: AddAttributeValueTranslationResponse;
  createAttribute: CreateAttributeResponse;
  updateAttribute: UpdateAttributeResponse;
  addAttributeTranslation: AddAttributeTranslationResponse;
  createCategory: CreateCategoryResponse;
  updateCategory: UpdateCategoryResponse;
  addCategoryTranslation: AddCategoryTranslationResponse;
  createProductVariant: CreateProductVariantResponse;
  updateProductVariant: UpdateProductVariantResponse;
  createProduct: CreateProductResponse;
  updateProduct: UpdateProductResponse;
  addProductTranslation: AddProductTranslationResponse;
  createUser: CreateUserResponse;
  updateUser: UpdateUserResponse;
  userLogin: UserLoginResponse;
  userLogout: Scalars['Boolean'];
  createRole: CreateRoleResponse;
  updateRole: UpdateRoleResponse;
};

export type MutationCreateAttributeValueArgs = {
  input: NewAttributeValueInput;
};

export type MutationUpdateAttributeValueArgs = {
  input: UpdateAttributeValueInput;
  id: Scalars['Int'];
};

export type MutationAddAttributeValueTranslationArgs = {
  input: NewAttributeValueTranslationInput;
};

export type MutationCreateAttributeArgs = {
  input: NewAttributeInput;
};

export type MutationUpdateAttributeArgs = {
  input: UpdateAttributeInput;
  id: Scalars['Int'];
};

export type MutationAddAttributeTranslationArgs = {
  input: NewAttributeTranslationInput;
};

export type MutationCreateCategoryArgs = {
  input: NewCategoryInput;
};

export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
  id: Scalars['Int'];
};

export type MutationAddCategoryTranslationArgs = {
  input: NewCategoryTranslationInput;
};

export type MutationCreateProductVariantArgs = {
  input: NewProductVariantInput;
};

export type MutationUpdateProductVariantArgs = {
  input: UpdateProductVariantInput;
  id: Scalars['Int'];
};

export type MutationCreateProductArgs = {
  input: NewProductInput;
};

export type MutationUpdateProductArgs = {
  input: UpdateProductInput;
  id: Scalars['Int'];
};

export type MutationAddProductTranslationArgs = {
  input: NewProductTranslationInput;
};

export type MutationCreateUserArgs = {
  input: NewUserInput;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
  id: Scalars['Int'];
};

export type MutationUserLoginArgs = {
  input: NativeAuthInput;
};

export type MutationCreateRoleArgs = {
  input: NewRoleInput;
};

export type MutationUpdateRoleArgs = {
  input: UpdateRoleInput;
  id: Scalars['Int'];
};

export type CreateAttributeValueResponse =
  | AttributeValue
  | InputValidationError;

export type InputValidationError = {
  __typename: 'InputValidationError';
  message: Scalars['String'];
  errorCode: Scalars['String'];
  errors: Array<ValidationError>;
};

export type NewAttributeValueInput = {
  attributeId: Scalars['Int'];
  value: Scalars['String'];
};

export type UpdateAttributeValueResponse =
  | AttributeValue
  | InputValidationError
  | ErrorResult;

export type UpdateAttributeValueInput = {
  value: Maybe<Scalars['String']>;
};

export type AddAttributeValueTranslationResponse =
  | AttributeValueTranslation
  | InputValidationError
  | ErrorResult;

export type AttributeValueTranslation = {
  __typename: 'AttributeValueTranslation';
  languageCode: LanguageCode;
  updatedAt: Scalars['DateTime'];
  value: Scalars['String'];
};

export type NewAttributeValueTranslationInput = {
  attributeValueId: Scalars['Int'];
  value: Scalars['String'];
};

export type CreateAttributeResponse = Attribute | InputValidationError;

export type NewAttributeInput = {
  name: Scalars['String'];
};

export type UpdateAttributeResponse =
  | Attribute
  | InputValidationError
  | ErrorResult;

export type UpdateAttributeInput = {
  name: Maybe<Scalars['String']>;
};

export type AddAttributeTranslationResponse =
  | AttributeTranslation
  | InputValidationError
  | ErrorResult;

export type AttributeTranslation = {
  __typename: 'AttributeTranslation';
  languageCode: LanguageCode;
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
};

export type NewAttributeTranslationInput = {
  name: Scalars['String'];
  attributeId: Scalars['Int'];
};

export type CreateCategoryResponse = Category | InputValidationError;

export type NewCategoryInput = {
  name: Scalars['String'];
  slug: Maybe<Scalars['String']>;
  active: Scalars['Boolean'];
  parentId: Maybe<Scalars['Int']>;
};

export type UpdateCategoryResponse =
  | Category
  | InputValidationError
  | ErrorResult;

export type UpdateCategoryInput = {
  name: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  active: Maybe<Scalars['Boolean']>;
  parentId: Maybe<Scalars['Int']>;
};

export type AddCategoryTranslationResponse =
  | CategoryTranslation
  | InputValidationError
  | ErrorResult;

export type CategoryTranslation = {
  __typename: 'CategoryTranslation';
  languageCode: LanguageCode;
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type NewCategoryTranslationInput = {
  name: Scalars['String'];
  slug: Maybe<Scalars['String']>;
  categoryId: Scalars['Int'];
};

export type CreateProductVariantResponse =
  | ProductVariant
  | InputValidationError;

export type NewProductVariantInput = {
  productId: Scalars['Int'];
  price: Scalars['Int'];
  sku: Scalars['String'];
  attributesValuesIds: Array<Scalars['Int']>;
};

export type UpdateProductVariantResponse =
  | ProductVariant
  | InputValidationError
  | ErrorResult;

export type UpdateProductVariantInput = {
  productId: Maybe<Scalars['Int']>;
  price: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  attributesValuesIds: Maybe<Array<Scalars['Int']>>;
};

export type CreateProductResponse = Product | InputValidationError;

export type NewProductInput = {
  name: Scalars['String'];
  slug: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  categoryId: Scalars['Int'];
};

export type UpdateProductResponse =
  | Product
  | InputValidationError
  | ErrorResult;

export type UpdateProductInput = {
  name: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  categoryId: Maybe<Scalars['Int']>;
};

export type AddProductTranslationResponse =
  | ProductTranslation
  | InputValidationError
  | ErrorResult;

export type NewProductTranslationInput = {
  name: Scalars['String'];
  slug: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  productId: Scalars['Int'];
};

export type CreateUserResponse = User | InputValidationError;

export type NewUserInput = {
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  roleId: Scalars['Int'];
};

export type UpdateUserResponse = User | InputValidationError | ErrorResult;

export type UpdateUserInput = {
  firstname: Maybe<Scalars['String']>;
  lastname: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  password: Maybe<Scalars['String']>;
  roleId: Maybe<Scalars['Int']>;
};

export type UserLoginResponse = User | ErrorResult;

export type NativeAuthInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CreateRoleResponse = Role | InputValidationError;

export type NewRoleInput = {
  name: Scalars['String'];
  permissions: Array<Permission>;
};

export type UpdateRoleResponse = Role | InputValidationError | ErrorResult;

export type UpdateRoleInput = {
  name: Maybe<Scalars['String']>;
  permissions: Maybe<Array<Permission>>;
};

export type CoreUserFieldsFragment = { __typename: 'User' } & Pick<
  User,
  'id' | 'firstname' | 'lastname' | 'email' | 'createdAt'
> & {
    role: { __typename: 'Role' } & Pick<
      Role,
      'name' | 'isAdmin' | 'permissions'
    >;
  };

export type UserLoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type UserLoginMutation = {
  userLogin:
    | ({ __typename: 'User' } & CoreUserFieldsFragment)
    | ({ __typename: 'ErrorResult' } & Pick<
        ErrorResult,
        'message' | 'errorCode'
      >);
};

export type UserLogoutMutationVariables = Exact<{ [key: string]: never }>;

export type UserLogoutMutation = Pick<Mutation, 'userLogout'>;

export type UserProfileQueryVariables = Exact<{ [key: string]: never }>;

export type UserProfileQuery = {
  userProfile: Maybe<{ __typename: 'User' } & CoreUserFieldsFragment>;
};
