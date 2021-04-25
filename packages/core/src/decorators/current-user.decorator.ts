import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CmsContext } from '../types/CmsContext';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = <CmsContext>GqlExecutionContext.create(context).getContext();
    return ctx.user;
  },
);
