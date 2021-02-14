import { PERMISSIONS_METADATA_KEY } from "@config";
import { Permission } from "@generator";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { UserService } from "src/service";
import { SessionService } from "src/service/services/session.service";

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

    // FIX: Fetch for roles
    const user = await this.userService.findOne({ where: { id: userId } });

    if (!user) return false;

    // FIX: Check if roles has Owner permission
    const isOwner = true;

    if (isOwner) return true;

    // FIX: Use matchPermissions function
    return true;
  }
}
