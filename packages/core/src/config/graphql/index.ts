import { NODE_ENV } from "@environments";
import { Injectable } from "@nestjs/common";
import { GqlModuleOptions, GqlOptionsFactory } from "@nestjs/graphql";
import { permissionsTypeDef } from "../permissions";

Injectable();
export class GraphqlService implements GqlOptionsFactory {
  createGqlOptions(): GqlModuleOptions {
    return {
      typePaths: ["./**/*.graphql"],
      typeDefs: [permissionsTypeDef],
      cors:
        NODE_ENV !== "production"
          ? {
              credentials: true,
            }
          : true,
      bodyParserConfig: { limit: "50mb" },
      tracing: NODE_ENV !== "production",
      cacheControl: NODE_ENV === "production" && {
        defaultMaxAge: 5,
        stripFormattedExtensions: false,
        calculateHttpHeaders: false,
      },
    };
  }
}
