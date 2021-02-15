import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";

import { UserResolver } from "./resolvers/user.resolver";
import { AuthResolver } from "./resolvers/auth.resolver";
import { AuthGuard } from "./middleware/auth-guard";
import { ServiceModule } from "../service";
import { GraphqlService } from "../config";

const resolvers = [UserResolver, AuthResolver];

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
      provide: "APP_GUARD",
      useClass: AuthGuard,
    },
  ],
})
export class ApiModule {}
