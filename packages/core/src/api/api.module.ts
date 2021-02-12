import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { GraphqlService } from "@config";

import { ServiceModule } from "src/service";
import { UserResolver } from "./resolvers/user.resolver";

const resolvers = [UserResolver];

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
