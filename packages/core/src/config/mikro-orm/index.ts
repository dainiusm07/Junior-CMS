import {
  MikroOrmOptionsFactory,
  MikroOrmModuleOptions,
} from "@mikro-orm/nestjs";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import chalk from "chalk";
import settings from "./settings";

const highlighterSettings = {
  reserved: (s: string) => chalk.blueBright(s.toUpperCase()),
  boundary: chalk.white,
};

export class MikroOrmService implements MikroOrmOptionsFactory {
  createMikroOrmOptions(): MikroOrmModuleOptions {
    return {
      ...settings,
      highlighter: new SqlHighlighter(highlighterSettings as never),
    };
  }
}

export default settings;
