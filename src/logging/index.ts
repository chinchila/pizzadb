import winston from "winston";
import expressWinston from "express-winston";
import { HttpRequestLog, LoggingMetadata } from "./metaTypes";

export default function LoggingMiddleware() {
  return expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.json()),
    meta: true,
    metaField: null,
    responseField: null,
    requestField: null,
    dynamicMeta: (req, _) => {
      if (!req) {
        return {};
      }
      let requestLog: HttpRequestLog = {
        method: req.method,
        url: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
        fullClientIp: req.ip,
        bytesReceived: req.socket.bytesRead,
        userAgent: req.get("User-Agent"),
        referrer: req.get("Referrer"),
        origin: req.get("Origin"),
      };
      const meta: LoggingMetadata = { request: requestLog };
      return meta;
    },
    expressFormat: true,
    colorize: false,
    ignoreRoute: (_, __) => {
      return false;
    },
  });
}
