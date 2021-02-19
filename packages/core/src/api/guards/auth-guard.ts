import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Permission } from "@junior-cms/common";

import { PERMISSIONS_METADATA_KEY } from "../../config";
import { UserService } from "../../service";
import { SessionService } from "../../service/services/session.service";

const matchPermissions = (
  permissions: Permission[],
  userPermissions: Permission[]
) => permissions.every((permission) => userPermissions.includes(permission));

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    const sessionService = new SessionService(ctx);

    const permissions = this.reflector.get<Permission[]>(
      PERMISSIONS_METADATA_KEY,
      context.getHandler()
    );

    if (!permissions) return true;

    const userId = sessionService.getUserId();
    if (!userId) return false;

    const user = await this.userService.findOne({ where: { id: userId } });
    if (!user) return false;

    const userPermissions = user.roles.reduce((prev, role) => {
      return [...prev, ...role.permissions];
    }, [] as Permission[]);

    const isOwner = userPermissions.includes(Permission.Owner);

    const canActivate = matchPermissions(permissions, userPermissions);

    if (isOwner || canActivate) {
      ctx.user = user;
      return true;
    }

    return false;
  }
}
