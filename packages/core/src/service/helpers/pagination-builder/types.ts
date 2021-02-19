import { BaseEntity } from "../../../entities/base/base.entity";
import { Unpacked } from "../../../types";

type ConcatLiterals<T extends string, K> = K extends string ? `${T}.${K}` : T;

export type Relations<T> = {
  [K in keyof T]: Unpacked<T[K]> extends BaseEntity
    ? K extends string
      ? K | ConcatLiterals<K, Relations<Unpacked<T[K]>>>
      : never
    : never;
}[keyof T];

type FindConditions<T> = keyof {
  [P in keyof T]?: Unpacked<T[P]> extends BaseEntity
    ? FindConditions<Unpacked<T[P]>>
    : any;
};

export type CmsFindOptions<T> = {
  count?: boolean;
  relations?: Relations<T>;
  where?: FindConditions<T>;
  skip?: number;
  take?: number;
  withDeleted?: boolean;
};

// const keys: OnlyPossible<TestType> = ''
