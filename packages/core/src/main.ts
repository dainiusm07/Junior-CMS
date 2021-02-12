import { NestFactory } from "@nestjs/core";
import {
  NestFastifyApplication,
  FastifyAdapter,
} from "@nestjs/platform-fastify";
import { Logger } from "@nestjs/common";
import * as chalk from "chalk";
import { getConnection } from "typeorm";
import * as helmet from "fastify-helmet";
// import * as bodyParser from "body-parser";
import * as rateLimit from "fastify-rate-limit";

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
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter()
    );

    // NOTE: database connect
    const connection = getConnection("default");
    const { isConnected } = connection;
    // connection.runMigrations();
    isConnected
      ? Logger.log(`🌨️  Database connected`, "TypeORM", false)
      : Logger.error(`❌  Database connect error`, "", "TypeORM", false);

    // NOTE: adapter for e2e testing
    app.getHttpAdapter();

    // NOTE: added security
    /**
     * Helmet default configuration
     * doesn't allow apollo-server-fastify to do it's job
     */
    app
      .getHttpAdapter()
      .getInstance()
      .register(helmet, {
        contentSecurityPolicy: {
          directives: {
            defaultSrc: [`'self'`],
            styleSrc: [
              `'self'`,
              `'unsafe-inline'`,
              "cdn.jsdelivr.net",
              "fonts.googleapis.com",
            ],
            fontSrc: [`'self'`, "fonts.gstatic.com"],
            imgSrc: [`'self'`, "data:", "cdn.jsdelivr.net"],
            scriptSrc: [`'self'`, `https: 'unsafe-inline'`, `cdn.jsdelivr.net`],
          },
        },
      });

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
