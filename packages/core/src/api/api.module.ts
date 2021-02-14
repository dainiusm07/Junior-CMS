import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { GraphqlService } from "@config";

import { ServiceModule } from "src/service";
import { UserResolver } from "./resolvers/user.resolver";
import { AuthResolver } from "./resolvers/auth.resolver";
import { AuthGuard } from "./middleware/auth-guard";

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
