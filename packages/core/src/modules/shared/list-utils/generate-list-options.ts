import { Constructor } from "@mikro-orm/core";
import { ArgsType, Field, InputType, Int } from "@nestjs/graphql";
import { Type } from "class-transformer";

import { ExcludeNever } from "../../../types";
import { DateOperators, NumberOperators, StringOperators } from "../operators";
import { SortOptions } from "./sort-order";

type ConvertTypes<T> = {
  [K in keyof T]?: T[K] extends string | null
    ? StringOperators
    : T[K] extends number | null
    ? NumberOperators
    : T[K] extends Date | null
    ? DateOperators
    : never;
};

export type FilterOptions<T> = ExcludeNever<ConvertTypes<T>>;

export type IListOptions<T, P = Record<string, unknown>> = {
  filter: FilterOptions<T>;
  sort: SortOptions<P>;
  page: number;
  limit: number;
};

export const generateListOptions = <T, P>(
  filterInputCls: Constructor<T>,
  sortOrderCls: Constructor<P>
) => {
  @ArgsType()
  @InputType({ isAbstract: true })
  class ListOptions implements IListOptions<T, P> {
    @Type(() => filterInputCls)
    @Field(() => filterInputCls)
    filter: T;

    @Type(() => sortOrderCls)
    @Field(() => sortOrderCls)
    sort: P;

    @Field(() => Int)
    page: number;

    @Field(() => Int)
    limit: number;
  }

  return ListOptions;
};
