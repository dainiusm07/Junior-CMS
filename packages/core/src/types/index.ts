import { BaseEntity } from "../modules/shared/base.entity";

export type BaseKeys = keyof BaseEntity | "deletedAt";

export type Unpacked<T> = T extends (infer U)[] ? U : T;

type ConcatLiterals<T extends string, K> = K extends string ? `${T}.${K}` : T;

export type Relations<T> = {
  [K in keyof T]: Unpacked<T[K]> extends BaseEntity
    ? K extends string
      ? K | ConcatLiterals<K, Relations<Unpacked<T[K]>>>
      : never
    : never;
}[keyof T];

export type ExcludeNever<T> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends undefined ? never : K;
  }[keyof T]
>;

export type PartialEntity<T> = ExcludeNever<
  {
    [K in keyof T]?: T[K] extends string
      ? string
      : T[K] extends number
      ? number
      : T[K] extends Date
      ? Date
      : T[K] extends Date | null
      ? Date | null
      : Unpacked<T[K]> extends string
      ? string[]
      : Unpacked<T[K]> extends number
      ? number[]
      : never;
  }
>;
