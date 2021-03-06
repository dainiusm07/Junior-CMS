import { registerEnumType } from "@nestjs/graphql";

import { ExcludeNever } from "../../../types";

export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

registerEnumType(SortOrder, { name: "SortOrder" });

export type SortOptions<T> = ExcludeNever<
  {
    [K in keyof T]?: T[K] extends string | null
      ? SortOrder
      : T[K] extends number | null
      ? SortOrder
      : T[K] extends Date | null
      ? SortOrder
      : never;
  }
>;
