import { Constructor } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "@nestjs/graphql";

type Pagination = {
  currentPage: number;
  totalPages: number;
};

export type IListResponse<T> = {
  items: T[];
  totalItems: number;
  pagination: Pagination;
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
