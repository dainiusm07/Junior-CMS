import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";
import chalk from "chalk";
import { MikroORM } from "@mikro-orm/core";
import helmet from "helmet";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import { API_END_POINT } from "@junior-cms/common";

import { AppModule } from "./app.module";
import {
  API_DOMAIN,
  API_PORT,
  NODE_ENV,
  RATE_LIMIT_MAX,
  SESSION_SECRET,
  SESSION_TTL,
} from "./common/environment";
import { LoggerMiddleware } from "./middleware";
import { LoggingInterceptor, TimeoutInterceptor } from "./interceptors";

declare const module: any;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

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
    // Database
    const orm = app.get(MikroORM);

    (await orm.isConnected())
      ? Logger.log(`🌨️  Database connected`, "MikroORM", false)
      : Logger.error(`❌  Database connection error`, "", "MikroORM", false);

    // Application
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
