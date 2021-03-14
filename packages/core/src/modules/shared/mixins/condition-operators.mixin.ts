import { Constructor } from "@mikro-orm/core";
import { Field, InputType } from "@nestjs/graphql";
import { Expose, Type } from "class-transformer";

import { Operators } from "../operators.enum";

export const conditionOperatorsMixin = <T extends Object>(
  cls: Constructor<T>
) => {
  @InputType({ isAbstract: true })
  // @ts-ignore
  abstract class ExtendedWithOperatorsMixin extends cls {
    @Expose({ name: Operators.$and })
    @Type(() => cls)
    @Field(() => [cls], { nullable: true, name: Operators.$and })
    $and: T[];

    @Expose({ name: Operators.$or })
    @Type(() => cls)
    @Field(() => [cls], { nullable: true, name: Operators.$or })
    $or: T[];
  }

  return ExtendedWithOperatorsMixin;
};
