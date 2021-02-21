import { join } from "path";
import { generate } from "@graphql-codegen/cli";
import { permissionsTypeDef } from "../packages/core/src/config/permissions";

const typesPath = join(process.cwd(), "packages/core/src/modules/**/*.graphql");

const outputPath = join(process.cwd(), "packages/common/src/graphql-types.ts");

generate({
  generates: {
    [outputPath]: {
      overwrite: true,
      plugins: ["typescript"],
      schema: [permissionsTypeDef, typesPath],
    },
  },
});
