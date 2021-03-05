import { Injectable } from "@nestjs/common";
import { GqlModuleOptions, GqlOptionsFactory } from "@nestjs/graphql";
import { NODE_ENV } from "../../common/environment";
import { join } from "path";

Injectable();
export class GraphqlService implements GqlOptionsFactory {
  createGqlOptions(): GqlModuleOptions {
    return {
      cors:
        NODE_ENV !== "production"
          ? {
              credentials: true,
            }
          : true,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
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
