import { Field, ObjectType } from '@nestjs/graphql';

import { ErrorCode } from '../common/errors/error-code.enum';

export type I18nVariables = {
  [key: string]: string | number;
};

@ObjectType({ isAbstract: true })
export abstract class I18nError {
  @Field()
  abstract message: string;

  @Field()
  abstract errorCode: ErrorCode;

  variables?: I18nVariables;

  translate?(t: i18nAPI['__']): void;
}
