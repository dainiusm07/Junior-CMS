import { MikroOrmModule } from "@mikro-orm/nestjs";
import { CacheModule, Module } from "@nestjs/common";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
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
import { CategoryModule } from "./modules/category/category.module";
import { AttributeModule } from "./modules/attribute/attribute.module";
import { AttributeValueModule } from "./modules/attribute-value/attribute-value.module";
import { InputValidationFilter } from "./middleware/input-validation.filter";

const CustomModules = [
  AttributeValueModule,
  AttributeModule,
  CategoryModule,
  ProductModule,
  UserModule,
  AuthModule,
  RoleModule,
];

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
    {
      provide: APP_FILTER,
      useClass: InputValidationFilter,
    },
  ],
})
export class AppModule {}
