import { Constructor } from "@mikro-orm/core";
import { ArgsType, Field, InputType, Int, ObjectType } from "@nestjs/graphql";

import { BaseEntity } from "./base.entity";
import { DateOperator, NumberOperator, StringOperator } from "./operators";
import { Operators } from "./operators.enum";

type FilteredKeys<T> = {
  [K in keyof T]: T[K] extends undefined ? never : K;
}[keyof T];

type ExcludeNever<T> = Pick<T, FilteredKeys<T>>;

type ConvertTypes<T> = {
  [K in keyof T]?: T[K] extends string | null
    ? StringOperator
    : T[K] extends number | null
    ? NumberOperator
    : T[K] extends Date | null
    ? DateOperator
    : // : T[K] extends BaseEntity
      // ? ExcludeNever<ConvertTypes<T[K]>>
      never;
};

export type FilterOptions<T> = ExcludeNever<ConvertTypes<T>>;

export type IListOptions<T> = {
  filter?: FilterOptions<T> | null;
  page: number;
  limit: number;
};

type Pagination = {
  currentPage: number;
  totalPages: number;
};

export type IListResponse<T> = {
  items: T[];
  totalItems: number;
  pagination: Pagination;
};

export const conditionOperatorsMixin = <T extends Object>(
  cls: Constructor<T>
) => {
  @InputType({ isAbstract: true })
  // @ts-ignore
  abstract class ExtendedWithOperatorsMixin extends cls {
    @Field(() => [cls], { nullable: true, name: Operators.$and })
    $and: T[];

    @Field(() => [cls], { nullable: true, name: Operators.$or })
    $or: T[];
  }

  return ExtendedWithOperatorsMixin;
};

export const generateListOptions = <T>(filterInputCls: Constructor<T>) => {
  @ArgsType()
  @InputType({ isAbstract: true })
  class ListOptions implements IListOptions<T> {
    @Field(() => filterInputCls, { nullable: true })
    filter?: T | null;

    @Field(() => Int)
    page: number;

    @Field(() => Int)
    limit: number;
  }

  return ListOptions;
};

@ObjectType()
class PaginationResult implements Pagination {
  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  totalPages: number;
}

export const generateListResponse = <T>(cls: Constructor<T>) => {
  @ObjectType({ isAbstract: true })
  class ListResponse implements IListResponse<T> {
    @Field(() => [cls])
    items: T[];

    @Field(() => Int)
    totalItems: number;

    @Field(() => PaginationResult)
    pagination: PaginationResult;
  }

  return ListResponse;
};
