import { MikroOrmModule } from "@mikro-orm/nestjs";
import { CacheModule, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";

import { GraphqlService } from "./config";
import { CacheService } from "./config/cache";
import { MikroOrmService } from "./config/mikro-orm";
import { AuthGuard } from "./middleware/auth-guard";

// Modules
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { RoleModule } from "./modules/role/role.module";
import { ProductModule } from "./modules/product/product.module";

const CustomModules = [ProductModule, UserModule, AuthModule, RoleModule];
@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useClass: MikroOrmService,
    }),
    CacheModule.registerAsync({
      useClass: CacheService,
    }),
    GraphQLModule.forRootAsync({
      useClass: GraphqlService,
    }),
    ...CustomModules,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
