import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { GraphqlService } from "@config";

import { ServiceModule } from "src/service";
import { UserResolver } from "./resolvers/user.resolver";
import { AuthResolver } from "./resolvers/auth.resolver";

const resolvers = [UserResolver, AuthResolver];

@Module({
  imports: [
    ServiceModule,
    GraphQLModule.forRootAsync({
      useClass: GraphqlService,
    }),
  ],
  providers: [...resolvers],
})
export class ApiModule {}
