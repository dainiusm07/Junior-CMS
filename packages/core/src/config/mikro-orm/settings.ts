import { MikroOrmModuleOptions } from "@mikro-orm/nestjs";

import {
  DB_DATABASE,
  DB_HOST,
  DB_PASS,
  DB_PORT,
  DB_USER,
  NODE_ENV,
} from "../../environments";

interface Environment {
  [key: string]: MikroOrmModuleOptions;
}

const configs: Environment = {
  development: {
    dbName: "cms",
    host: "localhost",
    port: 5432,
    user: "",
    password: "",
    debug: ["query", "query-params"],
  },
  production: {
    dbName: DB_DATABASE,
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
  },
};

const MikroORMConfig: MikroOrmModuleOptions = {
  type: "postgresql",
  ...configs[NODE_ENV],
  entities: ["./src/modules/**/*.entity.ts"],
};

export default MikroORMConfig;
