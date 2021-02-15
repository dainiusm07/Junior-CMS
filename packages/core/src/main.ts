import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";
import chalk from "chalk";
import { getConnection } from "typeorm";
import helmet from "helmet";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";

import { AppModule } from "./app.module";
import {
  NODE_ENV,
  RATE_LIMIT_MAX,
  SESSION_SECRET,
  SESSION_TTL,
} from "./environments";
import {
  LoggingInterceptor,
  TimeoutInterceptor,
  LoggerMiddleware,
} from "./common";
import { API_DOMAIN, API_END_POINT, API_PORT } from "@junior-cms/common";

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

    // Session
    const RedisStore = connectRedis(session);

    app.use(
      session({
        secret: SESSION_SECRET,
        store: new RedisStore({ ttl: SESSION_TTL, client: new Redis() }),
        name: "sid",
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: NODE_ENV === "production",
          maxAge: SESSION_TTL,
        },
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

    await app.listen(API_PORT);

    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }

    const appUrl = `http://${API_DOMAIN}:${API_PORT}`;

    Logger.log(`🤬  Application is running on: ${appUrl}`, "NestJS", false);

    Logger.log(
      `API ready at ${chalk.bold(`${appUrl}/${API_END_POINT}`)}`,
      "Bootstrap",
      false
    );
  } catch (error) {
    Logger.error(`❌  Error starting server, ${error}`, "", "Bootstrap", false);
    process.exit();
  }
}

bootstrap();
