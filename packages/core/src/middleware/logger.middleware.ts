import { Logger } from "@nestjs/common";
import { NextFunction, Response, Request } from "express";

export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  Logger.debug(
    `💬  ${
      req.headers["user-agent"]
        ? req.headers["user-agent"].split(") ")[0]
        : req.headers
    })`,
    "Bootstrap",
    false
  );
  next();
}
