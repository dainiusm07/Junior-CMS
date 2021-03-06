import { Constructor } from "@mikro-orm/core";
import { ArgsType, Field, InputType, Int } from "@nestjs/graphql";

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
  filter?: FilterOptions<T> | null;
  sort?: SortOptions<P> | null;
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
    @Field(() => filterInputCls, { nullable: true })
    filter?: T | null;

    @Field(() => sortOrderCls, { nullable: true })
    sort?: P | null;

    @Field(() => Int)
    page: number;

    @Field(() => Int)
    limit: number;
  }

  return ListOptions;
};
