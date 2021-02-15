import * as path from "path";
import { generate } from "@graphql-codegen/cli";
import { API_END_POINT, API_PORT } from "../src/environment";

generate({
  overwrite: true,
  generates: {
    [path.join(__dirname, "../src/generated-types.ts")]: {
      schema: `http://localhost:${API_PORT}/${API_END_POINT}`,
      plugins: ["typescript"],
    },
  },
});
