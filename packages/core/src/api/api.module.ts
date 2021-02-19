import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { APP_GUARD } from "@nestjs/core";

import { UserResolver } from "./resolvers/user.resolver";
import { AuthResolver } from "./resolvers/auth.resolver";
import { AuthGuard } from "./guards/auth-guard";
import { ServiceModule } from "../service";
import { GraphqlService } from "../config";
import { RoleResolver } from "./resolvers/role.resolver";

const resolvers = [UserResolver, AuthResolver, RoleResolver];

@Module({
  imports: [
    ServiceModule,
    GraphQLModule.forRootAsync({
      useClass: GraphqlService,
    }),
  ],
  providers: [
    ...resolvers,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class ApiModule {}
