import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";
import * as chalk from "chalk";
import { getConnection } from "typeorm";
import * as helmet from "helmet";
import * as bodyParser from "body-parser";
import * as rateLimit from "express-rate-limit";

import { AppModule } from "./app.module";
import {
  PORT,
  NODE_ENV,
  DOMAIN,
  RATE_LIMIT_MAX,
  PRIMARY_COLOR,
  END_POINT,
} from "@environments";
import { MyLogger } from "@config";
import {
  LoggingInterceptor,
  TimeoutInterceptor,
  // ValidationPipe,
  LoggerMiddleware,
} from "@common";

declare const module: any;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // Database connection
    const connection = getConnection("default");
    const { isConnected } = connection;
    // connection.runMigrations();
    isConnected
      ? Logger.log(`🌨️  Database connected`, "TypeORM", false)
      : Logger.error(`❌  Database connect error`, "", "TypeORM", false);

    // NOTE: adapter for e2e testing
    app.getHttpAdapter();

    // Additional Security
    app.use(
      helmet({
        contentSecurityPolicy: NODE_ENV === "production" ? undefined : false,
      })
    );

    // Body Parser
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(
      bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000,
      })
    );

    // Rate Limit
    app.use(
      rateLimit({
        windowMs: 1000 * 60 * 60, // an hour
        max: RATE_LIMIT_MAX, // limit each IP to 100 requests per windowMs
        message:
          "⚠️  Too many request created from this IP, please try again after an hour",
      })
    );

    // NOTE:loggerMiddleware
    NODE_ENV !== "testing" && app.use(LoggerMiddleware);

    // NOTE: interceptors
    app.useGlobalInterceptors(new LoggingInterceptor());
    app.useGlobalInterceptors(new TimeoutInterceptor());

    // NOTE: global nest setup
    // app.useGlobalPipes(new ValidationPipe());

    app.enableShutdownHooks();

    await app.listen(PORT);

    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }

    const appUrl = `http://${DOMAIN}:${PORT}`;

    Logger.log(`🤬  Application is running on: ${appUrl}`, "NestJS", false);

    Logger.log(
      `API ready at ${chalk.bold(`${appUrl}/${END_POINT}`)}`,
      "Bootstrap",
      false
    );
  } catch (error) {
    Logger.error(`❌  Error starting server, ${error}`, "", "Bootstrap", false);
    process.exit();
  }
}

bootstrap();
