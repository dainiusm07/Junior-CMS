import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { PERMISSIONS_METADATA_KEY } from '../common/constants';
import { Permission } from '../common/permission.enum';
import { AuthService } from '../modules/auth/auth.service';

const matchPermissions = (
  permissions: Permission[],
  userPermissions: Permission[]
) => permissions.every((permission) => userPermissions.includes(permission));

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();

    const permissions = this.reflector.get<Permission[]>(
      PERMISSIONS_METADATA_KEY,
      context.getHandler()
    );

    if (!permissions) return true;

    const user = await this.authService.getCurrentUser(ctx);

    if (!user || !user.role) return false;

    const canActivate = matchPermissions(permissions, user.role.permissions);

    if (user.role.isAdmin || canActivate) {
      ctx.user = user;
      return true;
    }

    return false;
  }
}
